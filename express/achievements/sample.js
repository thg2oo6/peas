const Achievements = require('.');
const Group = Achievements.Group;
const Activity = Achievements.Activity;

var SampleGroup = new Group({
    name: "Sample Group",
    description: "Sample Group Description",
    logo: "/images/achievements/sample/logo.jpg"
});

SampleGroup.push(new Activity({
    name: "First Activity",
    description: "First Sample Group Description",
    badge: "/images/achievements/sample/badge1.jpg",
    score: 10
}));

SampleGroup.push(new Activity({
    name: "Second Activity",
    description: "Second Sample Group Description",
    badge: "/images/achievements/sample/badge2.jpg",
    score: 5
}));

SampleGroup.push(new Activity({
    name: "Third Activity",
    description: "Third Sample Group Description",
    badge: "/images/achievements/sample/badge3.jpg",
    score: 15
}));


module.exports = SampleGroup;