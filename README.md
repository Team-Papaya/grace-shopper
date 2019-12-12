# Grace Shopper: Papa's Attic

An E-Commerce react web application built by a team of four in a nine day sprint.

## Skip the set up and check out the live link:

[Heroku Link][heroku-link]

[heroku-link]: https://papas-attic.herokuapp.com/

## Run it locally instead:

open terminal and run

```
npm install
createdb grace-shopper
npm start
```

check out http://localhost:8080

## Core Features

All Users can:

* Browse products by pagination or by search.
* Select product to view specifc info including reviews.
* Search by category or by name.
* Add or remove products to cart.

Logged in Users can:

* View Profile where user info including user's reviews and past orders are listed.
* Select or change shipping info at checkout.
* Pay by credit card using Stripe Authentication.
* Receive email via SendGrid on purchase info.

Admins can:

* Add new products to products list.
* Update products to remove availability or update information.
* Browse all or single users and choose to delete user accounts.
* Browse all orders and sort by order status.
* Change status on individual orders.
