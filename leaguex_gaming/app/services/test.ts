import {db} from '../../../db/sequelize'
import { PostsColumns } from '../models/postModels';
import { UsersColumns } from '../models/userModel';
import { userFollowTxnColumns } from '../models/user_follow_txn';

interface RecommendedPost {
    postId : number;
    text: string;
    userId: number;
    likes: number;
    comments: number;
    timestamp: Date;
    popularityScore: number;
}

const getfeedRecomendationService = async(user_id: number) => {
    console.log({user_id})
    console.log(UsersColumns.ID, `testing`)
    const userData = await db.users.findAll({
        where : { [UsersColumns.ID] : user_id},
        raw : true
    })
    console.log({userData})
    const recommendedPosts = await db.posts.findAll({
        where: { [PostsColumns.USER_ID] : user_id } ,
        order: [['created', 'DESC']], 
        limit: 10 ,
        logging: true
    });

    console.log({recommendedPosts})

    const formattedPosts: RecommendedPost[] = recommendedPosts.map(post => ({
        postId: post.id,
        text: post.text,
        userId: post.user_id,
        likes: post.likes,
        comments: post.comments,
        timestamp: post.created || new Date(),
        popularityScore: calculatePopularityScore(post.likes, post.comments)
    }));

    return formattedPosts;
}

const calculatePopularityScore = (likes: number, comments: number): number => {
    return likes + comments;
};

const getUserProfile = async (userId: number) => {
    // Fetch user interests from database
    const userInterests  = await getUserInterests(userId);
    const followedUsers  = await getFollowedUsers(userId);

    return { userId, interests: userInterests, followedUsers };
};

const getUserInterests = async (userId: number)=> {
    const userInterests = await db.posts.findAll({
        attributes: [PostsColumns.SPORT_ID],
        where: { [PostsColumns.USER_ID] : userId},
        raw : true
    })
    return userInterests;
};

const getFollowedUsers = async (userId: number) => {
    const followedUsers = await db.user_follow_txn.findAll({ 
        where: { [userFollowTxnColumns.USER_ID] : userId } ,
        raw : true
    });

    console.log({followedUsers})
    
    return followedUsers;
};


export { getfeedRecomendationService }