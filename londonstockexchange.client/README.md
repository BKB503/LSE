# LSEG UI Chatbot

# Prerequisites
Visual Studio 2022 and
Install .Net 8 SDK and Nodejs 18

 The project is developed using a tech stack consisting of React and .NET 8 API.

 The UI is styled using the Material UI library, and the API is designed to fetch stock data for future use. However, for optimal usage, we could consider utilizing the same JSON file directly within the UI.

 # To run locally

# Future Enchancements 

1. Add authentication with SSO or Identity 4
2. Displaying the user's name in the first message of the chatbot, theme customization like light and dark mode
3. Use WebSockets for real-time stock price updates using Azure SignalR with .Net Function App
4. Improving the chatbot's styling with CSS and properly displaying avatar icons
5. Error logging in the UI can be enhanced by integrating with third-party tools, such as Azure Application Insights, to monitor and track errors effectively while also gaining insights into application usage.
6. Refactoring the code with more usage of Typescript interface, types and enums for the messages 