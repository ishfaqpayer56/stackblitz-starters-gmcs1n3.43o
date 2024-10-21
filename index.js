const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require("cors");
let port = 3000;

app.use(cors());

function addActivity(activityId, type, duration, caloriesBurned) {
  let items = { activityId, type, duration, caloriesBurned };
  activities.push(items);
  return activities;
}

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 }
];

app.get("/activities/add", (req, res) =>{
  let activityId = parseInt(req.query.activityId)
  let type = req.query.type
  let duration = parseInt(req.query.duration)
  let caloriesBurned = parseInt(req.query.caloriesBurned)
  let results = addActivity(activityId, type, duration, caloriesBurned);
  res.json({ activities: results });
  });

function sortActivitiesByDuration(activities){
 return activities.sort((a, b) => a.duration - b.duration);
}
app.get("/activities/sort-by-duration", (req, res) =>{
  let activitiesCopy = activities.slice();
  activitiesCopy = sortActivitiesByDuration(activities);

  res.json({ activities: activitiesCopy });
  
})

function filterActivitiesByType(activities, type){
   return activities.type === type;
}

app.get("/activities/filter-by-type",(req,res)=>{
  let type = req.query.type;
  let result = activities.filter((activity) => 
    filterActivitiesByType(activity, type))  
  res.json(result)
})

function calculateTotalCaloriesBurned(activities){
  let sum = 0;
  for (let i = 0; i < activities.length; i++) {
    sum = sum + activities[i].caloriesBurned;
  }
  return sum;
}
app.get("/activities/total-calories", (req, res) =>{
  let totalCaloriesBurned = calculateTotalCaloriesBurned(activities);

  res.json({ totalCaloriesBurned: totalCaloriesBurned });
});

function updateActivityDurationById(activities, activityId, duration) {
  for (let i = 0; i < activities.length; i++) {
    if (activities[i].activityId === activityId) {
      activities[i].duration = duration;
    }
  }
  return activities;
}
app.get("/activities/update-duration", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let results = updateActivityDurationById(activities, activityId, duration);

  res.json({ activities: results });
});

function deleteActivityById(activities, activityId) {
  return activities.activityId !== activityId;
}


app.get("/activities/delete", (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let results = activities.filter((activity) =>
    deleteActivityById(activity, activityId),
  );

  res.json({ activities: results });
});

function deleteActivitiesByType(activities, type) {
  return activities.type !== type;
}


app.get("/activities/delete-by-type", (req, res) => {
  let type = req.query.type;
  let results = activities.filter((activity) =>
    deleteActivitiesByType(activity, type),
  );

  res.json({ activities: results });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
