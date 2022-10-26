---
title:  'Assignment 3'
author:
- Jaya Nilakantan, Patricia Campbell
- 420-520-DW
---

This is an assignment that must be done with a __partner__. Your work must not be shared or published.

__Deadline__: see Moodle. In case of _exceptional_ circumstances you may request
an extension by sending a MIO to your teacher. Otherwise, late submissions are 
not accepted.

_Read all the assignment instructions before you begin_.

# Introduction

Personal finance, and equity ownership in the stock market are important concepts dealing with savings and money. Stocks represent partial ownership in a publicly traded corporation: as a stock price rises, the valuation of the company increases. Many individuals and corporations invest in the stock market, hoping for gains over time that are greater than interest you can get from a bank savings account. 

Stocks are traded in exchanges, and every publically traded stock has a ticker symbol e.g.: Tesla trades as TSLA on the Nasdaq exchange. We will only be using the NAasdaq in this project.

In this assignment, you will write a full-stack application (client and server sides of a site) that provides latest stock prices. From the end-user perspective:

* the user starts typing in the stock ticker symbol
* auto-complete options are presented below
* when the user submits, the real-time stock price is shown

# General Requirements

## finnhub API key

One of the partners will need to sign up to [Finnhub](https://finnhub.io/) and get a free API key. I recommend that you use your Dawson College email address. Note the key, you will be saving it in `keys.mjs` as described below.

## git and GitLab

Your instructor will assign you with your partner.

One partner will:

* create a new project in GitLab in the **appropriate subgroup** in https://gitlab.com/520-01-F22/section0x (based on your team name)
* Name your project `520-A3-Name1-Name2`, where `Name1` and `Name2` are the last names of the teammates and keep its visibility as *private*
  * give your project a good description
  * give it with a README file. This will be committed in `main`
  * also commit the `eslintrc.json` and `.gitignore` provided into `main` 
* Use the Protected Branch Workflow in `520-A3-Name1-Name2`. 
  * since you are working with a partner, you will create a branch called `A3` which will be the staging branch. Create your development branches off `A3`
    * create a new branch (from `A3`) **for every feature**
    * do not make any commits directly in `A3`
  * create Merge Requests from the development branches to **A3** and set the reviewer as your partner
  * Partners **must** perform a code review and give meaningful feedback if there are changes/improvements required. You **both** have responsibility to the quality of the code
  * the team-mate who opened the MR merges into `A3` when all comments are addressed
  * do **not** make any commits to `main` or merge into `main`
  * when you are ready to submit, you will open an MR to `main` and set your teacher as reviewer.
      * Make sure your Merge Request has a clear title.
      * In the MR description, write down any challenges you faced; explain if there are any parts missing in your submission and why. Indicate what you enjoyed and did not enjoy in this assignment
* Oh, and do __NOT__ merge into main!

Since we will be using Express and potentially node-fetch or Axios, you will need to make your project an npm package. One partner only should do the following in the root folder of the solution:

- `npm init` with:
  - the team members as author(s)
  - all the rest can be the default values, the description will come from GitLab, so you can keep it blank
- `npm install express`
- optional: `npm install node-fetch` if your version of node is less than 17.5 (version of node in labs is 16.18) and you want to use the Fetch API from the server. You might also want to explore [Axios](https://axios-http.com/) which is used a lot in industry
  - the partner will `npm install` when they clone from GitLab to get all the dependendancies

### Starter files

* there is no starter code provided, but we provide the `basicNasdaq.json` file as well as `.gitignore` and `.eslintrc.json`. Place the two latter files at the top level and the `basicNasdaq.json` file in an appropriate folder

# References

We will be using the [finnhub.io free API](https://finnhub.io/pricing), with the condition that this assignment is used for academic and personal use only. Do not use this API for a commercial project without a [commercial license](https://finnhub.io/faq).

The image I used for my demo comes from [Pixabay at Pexels](https://www.pexels.com/photo/airport-bank-board-business-534216/), converted to `.webp`. The Nasdaq symbol file comes from finnhub.io.

# Overview

You will be writing a client server site that: 

1. on the server-side: reads a file of all the supported stock symbols. 
2. on the server-side: provides one REST API endpoint to the client that returns all the symbols. 
3. on the server-side: provides a second REST API endpoint that will receive a ticker symbol
    * use the symbol to fetch info from the third party api
    * send the data back to the client
2. The client JS uses the list returned by the first API endpoint to populate the datalist with options of symbols (for selection)
3. The client JS  will provide a form, when the user submits the form, the client sends a request to the second REST endpoint.  Note that the browser does **not** query the third-party API directly as there are rate limits.

# Specifications

Your solution folder will contain multiple folders. Use the folder structure to separate files based on their responsibilities.

* a folder `files` for data files (e.g. `basicNasdaq.json`)
* a folder `fileio` for the modules that provide basic i/o functions for the data files 
* a folder `controllers` with modules that provide the business logic related to the application (I called this controllers). You need a module that reads once and returns the array of symbols, and one that interfaces with the [finnhub.io real-time quote endpoint](https://finnhub.io/docs/api/quote)
* and `public` for the client-side files.

There will also be a `node_modules` directory that will be generated by npm but this is in the .gitignore

## Back-end

### Generic file reader module

Code a module that exports an async function that takes in the filename (path and name) of a JSON file as a parameter. It uses the `fs/promises` module to read the file and returns an aray of symbol info. If there is an error, write its message to the `console.error` and rethrow it.

### Controllers

One controller exports a singleton object/class that reads the file contents.

The second controller exports a function that makes a Fetch (or [Axios](https://axios-http.com/)) call to the [finnhub.io quote endpoint](https://finnhub.io/docs/api/quote). Look at the sample URL: `"https://finnhub.io/api/v1/quote?symbol=AAPL&token=xxx"` You will replace the symbol with the user's request and the token with your API key. Once again, don't store your key in GitLab: put it in a file called `controllers/keys.mjs` that looks like this:

```js
export const key = { key : "your key here"};
```

Either return the JSON object returned by the API or throw an error if there was a problem.

### app.js

The `app.js` file is your Express file, with a route for static files pointing to `public`, two routes for each of your API endpoints, and a default 404 route.

Start listening only **after** you have read the symbol file. 

**IMPORTANT** the VSCode LiveServer runs on `http://127.0.0.1:5500` while the node.js server runs on `localhost:3000` (assuming your port is 3000) - this causes Cross-Origin-Resource-Sharing errors at the browser. To avoid these issues, either don't use LiveServer and go to directly to `localhost:3000` in the browser, or use the `cors` package (you can look up the documentation [here](https://github.com/expressjs/cors))

Note: unit testing is not required as we have not covered this yet!

## Front-end

### public

In a folder called public, write the html, css and js files necessary to:
- present a search input box and button to the end user
  - make a Fetch request to the first API endpoint to get all the symbols supported, and add these as a `datalist` associated with the input box. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) to see how a datalist works.
  - ignore errors if this first Fetch is unsuccessful, since this is not crucial for the functioning of the site
  - you can simplify your life by coding the search as an HTML5 form with a `required` [`search`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search) input; but make sure that you do not submit the form (`preventDefault`) but rather that you listen for the submit event and make the fetch request to the second API endpoint.
- the base URL of both API endpoints starts with `http://localhost:3000` 
- when you get the result to the second Fetch, either show the last price (`c` in the JSON), or show an error message
  - error messages (e.g.: symbol not found, please try again) should be styled appropriately
  - you can use the same paragraph for the definition and the error message, and add/remove the error style from the classList

Ask your teacher if you are spending over 30 minutes stuck on a problem! We are available on Slack!!

Remember to give attribution to the source of stock quotes, images or styling examples that you used for your site.

Remember to use JSDocs and a comment section at the top of each file with information about what it is for, a date and the author(s)


## Demo

![demo](img/A3demo2022.png)


## Tip

Code and test features incrementally!

# Submission

There are steps to be done _both on GitLab and Moodle_.

On git/GitLab:

* Make sure ESLint shows no errors or warnings in your source code.
* Push your `A3` branch to your `520-A3-Name1-Name2`
* On GitLab, open a Merge Request of `A3` against `main` with approriate titke and description
* Set your 520 teacher as reviewer.

On Moodle, Assignment 3:

* Submit a URL to the _Merge Request_ you created above.

You will receive a grade and feedback on Moodle. Your teacher may also make
comments on your Merge Request. 