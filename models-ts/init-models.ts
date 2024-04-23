import type { Sequelize } from "sequelize";

import { sports as _sports } from "../leaguex_gaming/app/models/sportsModel";
import type { sportsAttributes, sportsCreationAttributes } from "../leaguex_gaming/app/models/sportsModel"
import { events as _events } from "../leaguex_gaming/app/models/eventModels";
import type { eventsAttributes, eventsCreationAttributes } from "../leaguex_gaming/app/models/eventModels";
import { users as _users } from "../leaguex_gaming/app/models/userModel";
import type { usersAttributes, usersCreationAttributes } from "../leaguex_gaming/app/models/userModel";
import { posts as _posts } from "../leaguex_gaming/app/models/postModels";
import type { postsAttributes, postsCreationAttributes } from "../leaguex_gaming/app/models/postModels";
import { user_follow_txn as _user_follow_txn } from "../leaguex_gaming/app/models/user_follow_txn";
import type { user_follow_txnAttributes, user_follow_txnCreationAttributes } from "../leaguex_gaming/app/models/user_follow_txn";


export {
  _sports as sports,
  _events as events,
  _users as users,
  _posts as posts,
  _user_follow_txn as user_follow_txn
};

export type {
  sportsAttributes,
  sportsCreationAttributes,
  eventsAttributes,
  eventsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
  postsAttributes,
  postsCreationAttributes,
  user_follow_txnAttributes,
  user_follow_txnCreationAttributes
};

export function initModels(sequelize: Sequelize) {
  const sports = _sports.initModel(sequelize);
  const events = _events.initModel(sequelize);
  const users = _users.initModel(sequelize);
  const posts = _posts.initModel(sequelize);
  const user_follow_txn = _user_follow_txn.initModel(sequelize)

  events.belongsTo(sports, { as: "sport", foreignKey: "sport_id"});
  sports.hasMany(events, { as: "events", foreignKey: "sport_id"});
  posts.belongsTo(events, { as: "event", foreignKey: "event_id"});
  events.hasMany(posts, { as: "posts", foreignKey: "event_id"});
  posts.belongsTo(sports, { as: "sport", foreignKey: "sport_id"});
  sports.hasMany(posts, { as: "posts", foreignKey: "sport_id"});
  posts.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(posts, { as: "posts", foreignKey: "user_id"});
  user_follow_txn.belongsTo(users, { as: "follower", foreignKey: "follower_id"});
  users.hasMany(user_follow_txn, { as: "user_follow_txns", foreignKey: "follower_id"});
  user_follow_txn.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_follow_txn, { as: "user_user_follow_txns", foreignKey: "user_id"});

  return {
    sports: sports,
    events: events,
    users: users,
    posts: posts,
    user_follow_txn: user_follow_txn,
  };
}