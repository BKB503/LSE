import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
    Box,
    AppBar,
    Typography,
    TextField,
    IconButton,
    Paper,
    Slide,
    styled,
    ThemeProvider,
    createTheme,
    Container
} from "@mui/material";

import { BsRobot } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { StockExchangeModel } from "../models/StockExchangeModel";
import { StockModel } from "../models/StockModel";
import StockBox from "./StockBox";

const theme = createTheme({
    palette: {
        primary: {
            main: "#2196f3",
        },
        secondary: {
            main: "#f50057",
        },
    },
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: "relative",
    background: "blue",
    color: "white",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const MessageBox = styled(Paper)(({ isUser }) => ({
    padding: "10px 15px",
    margin: "8px",
    maxWidth: "100%",
    wordWrap: "break-word",
    backgroundColor: isUser ? "#f5f5f5" : "#e3f2fd",
    alignSelf: isUser ? "flex-end" : "flex-start",
    borderRadius: isUser ? "20px 20px 0 20px" : "20px 20px 20px 0",
}));

const ChatContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "700px",
    overflow: "hidden",
    position: "relative",
});

const MessageList = styled(Box)({
    flex: 1,
    overflow: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
});

const ChatBox = () => {
    const [stockExchangeData, setStockExchangeData] = useState<StockExchangeModel[]>(null);
    const [stockData, setStockData] = useState<StockModel[]>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messageListRef = useRef(null);
    useEffect(() => {
        getStocksData();
    }, []);

    const getStocksData = async () => {
        try {
            setLoading(true);
            setError(null); // Clear previous errors
            const response = await axios.get("api/stocks");
            setStockExchangeData(response.data);
            loadMainMenuMessage(response.data);
            
        } catch (err: any) {
            if (err.response) {
                // Server responded with a status other than 2xx
                setError(`Error ${err.response.status}: ${err.response.data}`);
            } else if (err.request) {
                // No response received from the server
                setError("No response received. Please check your network.");
            } else {
                // Other errors
                setError(`Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (message.trim()) {
            setMessages((prev) => [
                ...prev,
                { id: Date.now(), text: message, isUser: true },
            ]);
            setMessage("");
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: "Thanks for your message. Our team will respond shortly.",
                        isUser: false,
                    },
                ]);
            }, 2000);
        }
    };

    const updateExchangeSelectionMessage = (item, index) => {
        let stockData = stockExchangeData.find((x) => x.code === item.code);
        let stocks = [];
        stockData.topStocks && stockData.topStocks.map((stock, index) => (
            stocks.push({ code: stock.code, title: stock.stockName, price: stock.price })));
        setStockData(stocks);

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: item.title, isUser: true, type: "user" },
            { id: Date.now(), title: "Please select a Stock.", items: stocks, isUser: false, type: "stock" },
        ]);
    }

    const updateStockSelectionMessage = (item, index) => {
        const menuItems = [{ code: "mainMenu", title: "Main Menu" }, { code: "goBack", title: "Go Back" }];
        let stockDetail = stockData.find((x) => x.code === item.code);
        let title = `Stock Price of ${item.title} is ${stockDetail.price}.Please select an option`;

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: item.title, isUser: true, type: "user" },
            { id: Date.now(), title: title, items: menuItems, isUser: false, type: "stockDetail" },
        ]);
    }
    const loadMainMenuMessage = (stockExchangeData) => {
        let exchanges = [];
        stockExchangeData && stockExchangeData.map((exchange, index) => (
            exchanges.push({ code: exchange.code, title: exchange.stockExchange })));
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: "Please select a Stock Exchange.",
                items: exchanges,
                isUser: false,
                type: "exchange"
            },
        ]);
    }

    const handleItemClick = (item, index, type) => {
        if (type === "exchange") {
            updateExchangeSelectionMessage(item, index);
        }
        else if (type === "stock") {
            updateStockSelectionMessage(item, index);
        }
        else if (type === "stockDetail") {
            if (item.code === "mainMenu") {
                loadMainMenuMessage(stockExchangeData);
            } else {
                setMessages((prev) => [
                    ...prev,
                    { id: Date.now(), text: item.title, isUser: true, type: "user" },
                    { id: Date.now(), title: "Please select a Stock.", items: stockData, isUser: false, type: "stock" },
                ]);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                <Container  sx={{ width: '900px !important'} }>
                    <Paper
                        elevation={3}
                        sx={{ overflow: "hidden", borderRadius: "10px" }}
                    >
                        <StyledAppBar>
                            <Box sx={{
                                    p: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography variant="h6">
                                        <BsRobot />
                                        <span style={{ paddingLeft: 10 }}>LSEG chatbot </span>
                                    </Typography>
                                </Box>
                            </Box>
                        </StyledAppBar>

                        <ChatContainer>
                            <MessageList ref={messageListRef}>
                                <MessageBox key={"intro"} isUser={false}>
                                    <Typography>
                                        Hello! Welcome to LSEG. I'm here to help you.
                                    </Typography>
                                </MessageBox>
                                
                                {messages.map((msg, index) => (
                                    (msg?.type === "exchange" || msg?.type === "stock" || msg?.type === "stockDetail") && 
                                    <StockBox key={msg.id} id={msg.id} title={msg.title} items={msg.items} handleItemClick={handleItemClick} type={msg.type} /> ||
                                     msg.isUser &&
                                    <MessageBox key={msg.id} isUser={msg.isUser}>
                                        <Typography>{msg.text}</Typography>
                                        {msg.isUser && (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    mt: 1,
                                                }}
                                            ></Box>
                                        )}
                                    </MessageBox>
                                ))}
                               
                            </MessageList>

                            <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Type your message..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                        size="small"
                                    />
                                    <IconButton color="" onClick={handleSend}>
                                        <IoSendSharp />
                                    </IconButton>
                                </Box>
                            </Box>
                        </ChatContainer>
                    </Paper>
                </Container>
            </Slide>
        </ThemeProvider>
    );
};

export default ChatBox;
