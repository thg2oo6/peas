const Achievements = require('../../express/achievements');
const Group = Achievements.Group;
const Activity = Achievements.Activity;

var HelloWorld = new Group({
    name: "Hello World",
    description: "Hello World Description",
    logo: "/images/achievements/helloWorld/logo.png"
});

var activities = {
    FirstActivity: new Activity({
        name: "First Activity",
        description: "First Hello World Description",
        badge: "/images/achievements/helloWorld/badge1.png",
        score: 10
    }),
    SecondActivity: new Activity({
        name: "Second Activity",
        description: "Second Hello World Description",
        badge: "/images/achievements/helloWorld/badge2.png",
        score: 5
    }),
    ThirdActivity: new Activity({
        name: "Third Activity",
        description: "Third Hello World Description",
        badge: "/images/achievements/helloWorld/badge3.png",
        score: 15
    })
};


HelloWorld.extract(activities);

module.exports = {
    group: HelloWorld,
    activities: activities
};