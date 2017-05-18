# All the News That's Fit to Scrape - MongoDB Node Express Handlebars

## UCF Coding Bootcamp Week 16 Project

---

### Overview

In this assignment, I was asked to create a web app that lets users leave comments on the latest news. But I did not actually write any articles; instead, I used Mongoose and Cheerio packages along with MongoDB to scrape news from another site and store it in the apps database.

Check out the app running on heroku here: https://powerful-bayou-77610.herokuapp.com/

## Installation Instructions

1. Fork this repo and clone the forked repo to your computer. You will need node.js installed on your system.
2. At the command line navigate to the apps folder and run `npm install`, this will install the npm dependencies from the package.json file.
3. Install mongodb on your machine then run an instance of the db, if necessary -> https://www.mongodb.com/
4. Then run `node server.js` the console should log the port number the app will be on (currently 3001).
5. Go to your browser and type http://localhost:3001/ into the address bar to bring up the app.

---
## Screenshots

1. Initially the page may not have any articles or posssibly old articles

![Screenshot-01](/public/assets/img/screenshot1.jpg)

Click the 'Scrape New Artilcles!' Button up top to pull in new articles from the New York Times.

![Screenshot-02](/public/assets/img/screenshot2.jpg)
![Screenshot-03](/public/assets/img/screenshot3.jpg)

2. Users can click the link under Each Article title to go to the full article on the NYT website. For their favorite articles they can click save article and it will move the article from the home page the the saved article page.

![Screenshot-04](/public/assets/img/screenshot4.jpg)
![Screenshot-05](/public/assets/img/screenshot5.jpg)

3. A user can view notes and add their own notes by click the view/add notes button.

![Screenshot-06](/public/assets/img/screenshot6.jpg)

... A modal pops up showing previous notes and allows the user to submit their own.

![Screenshot-07](/public/assets/img/screenshot7.jpg)

4. Notes can be deleted by clicking the red x to the right of each note.

![Screenshot-08](/public/assets/img/screenshot8.jpg)
![Screenshot-09](/public/assets/img/screenshot9.jpg)

5. Lastly articles stored in saved articles can be removed and sent back to the home page by clicking the 'Remove from Saved' button.

![Screenshot-10](/public/assets/img/screenshot10.jpg)
![Screenshot-11](/public/assets/img/screenshot11.jpg)




- - -
## Known Issues & TODO Items

  * Add more scraped data like bylines

  * Have a login so users can only delete their notes and not other users...also giving the notes a user signature.

- - -

## Copyright

Jason O'Brien (C) 2017.
