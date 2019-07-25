# The Beverage Buddies

Hello world! 👋 This is a project for IMPACT

## How to use the app

The app was created using an ejected Create React App. So the installation is very simple.

```
git clone https://github.com/kristiandaugaard/winecollection.git
cd winecollection
npm i
npm start
```

Once you boot up the app, you will end on the Home Screen, this is simply a dummy component just there to illustrate the use of react router.

Navigate to the products view either by the button on the homescreen or the navigation in the header ↗.

**Notice that this app uses locale storage, so if you want to reset everything, please clear your local storage**

### The product list

The product list page is simply a page listing all products in the system. You can click the blue button at the top to add new products, or click on existing products to see a detailed view.

Furthermore there is a filter both for the SKU and name, and for the price. Lastly the <TH> elements are clickable for sorting both ascending and descending order.

### The detail page

The detail page is a page displaying more info about the product, aswell as giving an option to delete and edit the product, and to create a comment and a rating for the product.

On some products you will also find a `Wikipedia` sidebar, containing some images and random information. More on that in the section "Problems and choices"

## Tech used

- React
- React Router
- Redux
- Redux Persist
- axios
- Bootstrap
- Sass / BEM _(Not that much)_

## Problems and choices

### Why did i choose the technologies i chose?

React was a given, i chose React Router because i didn't want to start on the product list page, i wanted a simple introduction. Redux was not a given at all, not on such a small project. But I figured it was valuable to show my ability to work with it, besides i really enjoy the structure of having actions and reducers and components completely seperated. Also Redux ties in well with Redux Persist, in order to create local persistence.

I used React Bootstrap which is a react wrapper for bootstrap components. It was very nice to work with, and made for simple prototyping.

Sass is generally my primary css preprocessor. I personally prefer the original indented syntax to modern one, but i can work fine with either. Since i used bootstrap i didn't have to style that much, but i managed to lay a small foundation for BEM.

### What is worth having an extra look at

I would recommend trying out the enire app, add a new product, view some of the existing products, maybe delete one, and using the sorting and filtering functionality.

If i would have to put emphasis on something, it would probably be the code consitensy. Also I don't tend to do procedural programming, so every time i see the option to reuse code i will. A good example of this, is the `routes.js` file. Which is both used for the `Nav` component, aswell as the routing in `App.js`

Another thing could be the use of React Hooks instead of classes.

### API didn't work..

My initial idea when i read the assignment, was to create a localstorage app, with the ability to CRUD. I was hoping to integrate the suggested api lcboapi.com in order to add additional data to the submissions, and also use the api for dummy content.

To my surprise it seems that the API has been taken down. A quick search on waybackmachine.org reveals that earlier this month (July 2019), the website was taken down in favour of a github repo.
The github repo consistes of a Ruby on Rails app with the api and some docs. I installed the app using Docker, and thought I would just spin up a cloudserver on digitalocean and provide the API that way. However it appears that the rails app is faulty when it comes to CORS, as you need an API key in order to allow cross origin requests, and the api key-generator is broken in the repo.

I did not want to waste any more time on this, since i already installed the rails app with Docker on my local machine and tried to get it to work. So I decided to do a request on my Docker Rails app manually, and simply copy the json into a file, and import that file as an initial state on my redux reducer. (See `src/redux/reducers/productReducer`). I now had dummy data for the app, but sadly no way of showing that i know how to do api calls.

**Sidenote: The dummydate I copied form the API, had image links that didn't work. I looked at lcbo.com and investigated their image structure. I was able to get images of all the products, simply by parsing the product id into the url. See ProductDetail and ProductList component 🤪**

### Last attempt at doing some API

So lcboapi.com website was down, installing the repo didn't give me access to CORS requests. A last minute change to my app was that i figured i'd try to find a Wikipedia API, and display the first result of a query based on the product name, and show the sidebar of the article. Thankfully Wikipedia has a simple API for this. Sadly.. They dont return data, they return raw HTML. I liked the sillyness of the addition, so I decided to add the wiki sidebar, regardless of the hacky "string to HTML parsing"- solution.
