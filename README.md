# 👗 myCloset App Frontend

Welcome to the **myCloset Frontend** repository! This is the user-facing part of the *myCloset* fashion app, created with **React Native** and **Expo** to deliver an intuitive and stylish wardrobe management experience. With *myCloset*, users can effortlessly organize their clothes, gain insights into their wardrobe, and—most importantly—get outfit suggestions that are perfect for the current temperature and any occasion. *myCloset* takes the guesswork out of what to wear, making every day a little easier and a lot more fashionable!

- 🔗 **Backend Repository**: [myCloset Backend](https://github.com/AlaaMuhissen/myCloset_backend)
- 🔗 **Machine Learning Repository**: [myCloset ML](https://github.com/AlaaMuhissen/myCloset_ML)

## 📑 Table of Contents
- [🚀 Features](#-features)
- [🛠 Technologies](#-technologies)
- [⚙️ Setup](#️-setup)
- [📱 Screens](#-screens)
  - [Screenshots](#screenshots)
    - [Sign In & Sign Up Screens](#sign-in--sign-up-screens)
    - [Home Screen](#home-screen)
    - [Wardrobe Display](#wardrobe-display)
    - [Statistics](#statistics)
    - [Add New Clothing Item and Recognize Its Details](#add_new_clothing_item_and_recognize_its_details)
    - [Manual Outfit Generate Screen](#manual-outfit-generate-screen)
    - [Additional Screens](#additional-screens)
- [🤝 Contributing](#-contributing)

## 🚀 Features
- **User Authentication**: Secure login and registration through Firebase/Clerk, keeping your wardrobe private and accessible.
- **Wardrobe Display**: Organized views of items by category (Tops, Bottoms, Shoes, Accessories, etc.) and by season, with details on color and fabric type.
- **Outfit Planning**: Automatically suggests outfits based on the current temperature and specific occasions, ensuring users are always comfortable and stylish.
- **Color and Clothing Recognition**: Integrates with a machine learning model to recognize clothing types and prominent colors in uploaded images, making organization smarter and easier.
- **Predefined Tags and Filtering**: Built-in tags for popular occasions, seasons, and fabric types allow for quick filtering and easy access to relevant items.
- **Statistics Page**: Provides valuable insights into wardrobe usage, showing frequently worn items and overall outfit trends to help users maximize their wardrobe’s potential.

## 🛠 Technologies
- **React Native** - Cross-platform mobile app development.
- **Expo** - Simplifies development and deployment processes.
- **react-native-paper** - Polished, consistent UI components.
- **Firebase / Clerk** - Secure user authentication.

## ⚙️ Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/AlaaMuhissen/myCloset_frontend.git
   cd myCloset_frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the App**
   ```bash
   expo start
   ```

4. **Environment Variables**
   Create a `.env` file in the root directory with the following variables:
   - `REACT_APP_API_URL`: URL of the backend API.
   - `REACT_APP_FIREBASE_API_KEY`: Firebase API key (or Clerk credentials).

## 📱 Screens
- **Home Screen**: Displays wardrobe items, organized by categories and seasons.
- **Outfit Planner**: Offers temperature- and occasion-based outfit suggestions and lets users save and view planned outfits.
- **Statistics**: Provides insights into wardrobe usage, such as frequently worn items and outfit trends.
- **Tagging and Filtering**: Intuitive interface for tagging items and filtering by occasion, season, and more.

### Screenshots

#### Sign In & Sign Up Screens
<img src="https://github.com/user-attachments/assets/036e6b59-bb01-4858-ac6a-eb462eeeea2a" alt="Sign In Screen" width="200" height="400" />
<img src="https://github.com/user-attachments/assets/43d83196-2974-4219-b720-f4acf03eb8d2" alt="Sign Up Screen" width="200" height="400" />

#### Home Screen
<img src="https://github.com/user-attachments/assets/6ce1197c-35e2-45b6-a039-879a4e39cb7d" alt="Home Screen 1" width="200" height="400"/>
<img src="https://github.com/user-attachments/assets/bd362823-1c5c-4afd-aed7-f0fba379e3a4" alt="Home Screen 2" width="200" height="400"/>

#### Wardrobe Display
<img src="https://github.com/user-attachments/assets/158c331a-d784-4182-a8d6-d3afbd6d2972" alt="Wardrobe Display 1" width="200" height="400"/>
<img src="https://github.com/user-attachments/assets/520b6e11-ac17-4dbe-8897-10ed8c6cb930" alt="Wardrobe Display 2" width="200" height="400"/>

#### Statistics
<img src="https://github.com/user-attachments/assets/d0ad6f21-2aa9-4e0a-b02e-9038b11c64cd" alt="Statistics Screen 1" width="200" height="400"/>
<img src="https://github.com/user-attachments/assets/daa1bda2-5d7a-405a-83bf-cdd304d23873" alt="Statistics Screen 2" width="200" height="400"/>

#### Add New Clothing Item and Recognize Its Details
<img src="https://github.com/user-attachments/assets/d8ae416e-a57f-4c10-940d-4fa041806499" alt="Add Item Screen" width="200" height="400"/>
<img src="https://github.com/user-attachments/assets/e28d0949-a117-44ff-9ded-ed011190294f" alt="Recognize Details Screen" width="200" height="400"/>

#### Manual Outfit Generate Screen
<img src="https://github.com/user-attachments/assets/0619e785-318e-4ba2-a755-ad734d577272" alt="Manual Outfit Generate Screen" width="200" height="400"/>

#### Additional Screens
<img src="https://github.com/user-attachments/assets/5c517823-ad2c-4d03-9fa6-b227d21efda4" alt="Additional Screen" width="200" height="400"/>

## 🤝 Contributing
Contributions are welcome! Follow these steps to contribute:
1. **Fork** this repository.
2. **Create a branch**: `git checkout -b feature-name`
3. **Make your changes** and **commit**: `git commit -m 'Add feature'`
4. **Push to your branch**: `git push origin feature-name`
5. **Open a Pull Request**

Thank you for helping make *myCloset* even better! 😊
