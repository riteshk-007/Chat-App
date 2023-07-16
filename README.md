# Chat-App

Chat-App is a simple and lightweight chat application built using React.js and Firebase. This application allows users to communicate with each other in real-time using websockets.

## Features

- Real-time messaging: Users can send and receive messages in real-time without the need to refresh the page.
- Multiple users: Multiple users can join the chat room and participate in conversations simultaneously.
- Nickname customization: Users can set their own nicknames to be displayed in the chat.
- Typing indicator: The application displays typing indicators when a user is typing a message.
- Message timestamps: Each message is timestamped to indicate when it was sent.

## Getting Started

To get started with the Chat-App, follow the instructions below:

### Prerequisites

- [Node.js](https://nodejs.org) installed on your machine.

### Installation

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

3. Enter a nickname and click "Join Chat" to enter the chat room.

4. Start sending and receiving messages in real-time.

### Configuration

You can configure some aspects of the application by modifying the `config.js` file. The available options are:

- `PORT`: The port number on which the server will run. Default is `3000`.
- `MAX_HISTORY`: The maximum number of chat messages to store in the server's memory. Default is `100`.

## Contributing

Contributions to Chat-App are always welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

Chat-App is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Acknowledgements

Chat-App was inspired by the simplicity and functionality of real-time chat applications. It was built as a learning project and may serve as a starting point for more complex chat applications. Special thanks to the creators of React.js and Firebase for their excellent tools and documentation.
