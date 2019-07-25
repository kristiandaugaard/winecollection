# The Beverage Buddies

This is a project for IMPACT

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

Furthermore that is a filter both for the SKU and name, and for the price.

### The detail page

The detail page is a page displaying more info about the product, aswell as giving an option to create a comment and a rating for the product.

On some products you will also find a `Wikipedia` sidebar, containing some images and random information. More on that in the section "Problems and choices"

## Tech used

- React
- React Router
- Redux
- Redux Persist
- axios
- Sass _(Not that much)_

## Problems and choices
