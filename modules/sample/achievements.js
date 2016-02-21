const Achievements = require('../../express/achievements');
const Group = Achievements.Group;
const Activity = Achievements.Activity;

var Sample = new Group({
    name: "Sample Group",
    description: "This is a sample group activities. Based on this sample you can create " +
    "a new activities group for your users.",
    logo: "/images/achievements/sample/logo.png"
});

var activities = {
    FirstBadge: new Activity({
        name: "First Badge",
        description: "Access http://serverURL/trigger/sample/first and get the first badge.",
        badge: "/images/achievements/sample/first.png",
        score: 10
    }),
    SecondBadge: new Activity({
        name: "Second Badge",
        description: "Access http://serverURL/trigger/sample/second and get the second badge.",
        badge: "/images/achievements/sample/second.png",
        score: 20
    }),
    Spammer: new Activity({
        name: "Spammer",
        description: "Access http://serverURL/trigger/sample/first 5 times and get the " +
        "spammer badge (together with 70 PEAs).",
        badge: "/images/achievements/sample/spam.png",
        score: 70
    })
};


Sample.extract(activities);

module.exports = {
    group: Sample,
    activities: activities
};