# LSEG UI Chatbot

# Prerequisites
Visual Studio 2022 and
Install .Net 8 SDK and Nodejs 18

 The project is developed using a tech stack consisting of React and .NET 8 API.

 The UI is styled using the Material UI library, and the API is designed to fetch stock data for future use. However, for optimal usage, we could consider utilizing the same JSON file directly within the UI.

 # To run locally

 1. Clone the repository:

   ```sh
   git clone https://github.com/BKB503/LSE.git
   ```

2. Install dependencies:

   ```sh
	cd londonstockexchange.client
    npm install
   ```

3. Open the Repo using solution file in the cloned folder 
	1. Use Visual Studio debug button, launches the two apps one is .net 8 swagger and another on the UI with urls, 1st it will create local certficates please accept it
	     
		 UI: https://localhost:50250/ (Reload needed sometimes, API starts to load slow)
		 API: https://localhost:7261/swagger/index.html
	# Or
	2.  Using command shell navigate to the uses vite config
		
		1. API
       
			```sh 
			 cd londonstockexchange.client
			 dotnet run and it will listen on the port 7261 or navigate to https://localhost:7261/swagger/index.html
			```
	  
	    2. UI
			```sh 
			 cd londonstockexchange.client
			 npm run dev
		     Open with url:  https://localhost:50250/
			```