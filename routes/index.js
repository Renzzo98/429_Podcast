const express = require('express');
const fetch = require("node-fetch");
const async = require('async');
const Router = require('express-promise-router');
const router = new Router();
let Parser = require('rss-parser');
let parser = new Parser();


router.get("/",  async (req, res) => {
    var test = 100;
    const RSS_URL = `https://feed.podbean.com/the429podcast/feed.xml`;
    
    try {
        let feed = await parser.parseURL(RSS_URL);
        //console.log(feed.title);
        
        // feed.items.forEach(item => {
        //     console.log(item.title + ':' + item.link)
        // });

        let amt_Episode = feed.items.length;
        let amt_Mins = amt_Episode * 60;
        let amt_Water = 64;

        res.render("index", { 
            title: "Home",
            amt_Episode: amt_Episode,
            amt_Mins: amt_Mins,
            amt_Water: amt_Water
        });

    } catch (error) {
        console.log(error);
    }
});


router.get("/about", (req, res) => {
    res.render("about", { title: "About" });
}); 

module.exports = router;