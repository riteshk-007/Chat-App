#Chat App
![image](https://github.com/riteshk-007/Chat-App/assets/135107962/eb8b0f42-196f-4cc2-abcc-448d5a95cbfd)
![image](https://github.com/riteshk-007/Chat-App/assets/135107962/ff6cbb66-3724-45ad-96ce-0b105281f608)


## Installation

To use the Chat App locally on your machine, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/riteshk-007/Chat-App.git
```

2. Navigate to the project directory:

```bash
cd Chat-App
```

3. Install the dependencies:

```bash
npm install
```

### Usage

1. Start the server:

```bash
npm start
```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000). 
3. Create a Firebase project and enable the Firestore database and Authentication services.
4. Obtain your Firebase configuration details (apiKey, authDomain, projectId, etc.).
5. Create a `.env` file in the root directory of the project and add your Firebase configuration details in the following format:
![image](https://github.com/riteshk-007/Chat-App/assets/135107962/95c6fee4-975a-4bf1-b8eb-fe510d098af2)

```
REACT_APP_API_KEY=YOUR_API_KEY
REACT_APP_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
REACT_APP_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
REACT_APP_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_APP_ID=YOUR_APP_ID
```

6. Start the development server: `npm start`
7. Open your browser and visit `http://localhost:3000` to see the app in action.

Make sure you have Node.js and npm installed on your machine before starting the installation process.

## Deployment

To deploy the Chat App, you can follow the instructions provided by your hosting provider. However, here are general steps for deploying to platforms like Firebase Hosting:

1. Build the production-ready app: `npm run build`
2. Follow the deployment instructions provided by your hosting provider. For Firebase Hosting, you would need to install the Firebase CLI (`npm install -g firebase-tools`), log in to your Firebase account (`firebase login`), initialize your project (`firebase init`), and deploy the app (`firebase deploy`).

Remember to update the Firebase configuration in the `.env` file of your deployed app.
![image](https://github.com/riteshk-007/Chat-App/assets/135107962/126e2454-56a5-4845-81a9-5c279f22b1e2)

## Contributing

Contributions to the Chat App are welcome and encouraged! If you find any bugs or have suggestions for improvements, please open an issue on the GitHub repository.

When contributing, please follow these guidelines:

1. Fork the repository and create a new branch for your contribution.
2. Commit your changes with descriptive commit messages.
3. Push your branch to your forked repository.
4. Open a pull request to the main repository, describing the changes you have made.

## License

The Chat App is open-source and released under the [MIT License](https://github.com/riteshk-007/Chat-App/blob/main/LICENSE).

## Acknowledgements

This app was created with the help of the following resources:

- React.js documentation: https://reactjs.org/docs
- Firebase documentation: https://firebase.google.com/docs
- Tailwind CSS documentation: https://tailwindcss.com/docs

A special thanks to all the contributors who have helped make this project better!
