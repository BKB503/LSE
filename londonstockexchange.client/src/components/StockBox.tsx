import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from "@mui/material";
import { BsRobot } from "react-icons/bs";
interface StockBoxProps {
    id: string;
    title: string;
    items: any;
    type: string;
    handleItemClick: (item, index, type) => void;
}

const StockBox: React.FC<StockBoxProps> = ({ id, title, items, type, handleItemClick }) => {
    return (
        <Paper key={"paper-" + id}>
            <Box key={"box-" + id}>
                <Typography key={"typo-" + id}
                        component="h2"
                        sx={{ backgroundColor: "#e3f2fd", height: 40 }}
                    >
                    <BsRobot />    {title}
                    </Typography>
                </Box>
            <Divider key={"divider-" + id} />
            <List key={"list-" + id}>
                {items && items.map((exchange, index) => (
                        <>
                            <ListItem key={"li" + id}>
                                <ListItemButton key={"lib"+ id} onClick={ () => handleItemClick(exchange, index, type) }>
                                    <ListItemText
                                        key={"lit"+ id}
                                        primary={exchange.title}
                                        sx={{ textAlign: "center" }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        {index !== items.length - 1 && <Divider />}
                        </>
                    ))}
                </List>
            </Paper>)
}

export default StockBox;