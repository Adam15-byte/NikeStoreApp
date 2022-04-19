# CarRental App
Sample Store App used for browsing Nike shoes.

The App is made only for purposes of showcasing my Javascript & React skills.
The App isn't a commercial product and does not represent Nike offer.

## Table of contents
* [General info](#general-info)
* [Technologies](#Technologies)
* [Videos](#Videos)
* [Further improvments](#Further-improvments)

## General info
The main feature of the App is animated FlatList on the upper half of the browsing screen. Upon finishing the scroll animation the current position is calculated and the data on the screen is updated. Scrolling is also read and interpolated into colors on the screen and scroll indicator below the images.
Before adding the product to the Shopping Bag it is required to choose a Size.

Inside the Shopping Cart the user can add or subtract from the specific item which leads to updating total price displayed.

Data about shoes taken from the official Nike website:
https://www.nike.com/w/mens-shoes-nik1zy7ok
The pictures were manually cut out to ensure transparent backgrounds. 

## Technologies
* React Native Stack Navigation
* React Native Reanimated
* Hooks: useEffect, useState, useContext, createContext, useCallback

## Videos
https://user-images.githubusercontent.com/64642323/164062108-392777df-fa6e-4edf-87ec-c22ae2cc3f8b.mp4

## Further improvments
* App stops on the screen of the shopping cart, however further screens with payments may be integrated.
* Instead of the circular background behind the scrollable shoe images, there could be placed a svg Nike logo that also interpolates color based on X translation.





