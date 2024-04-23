import { Op } from 'sequelize';
import {db} from '../../../db/sequelize'
import { PostsColumns } from '../models/postModels';
import { userFollowTxnColumns } from '../models/user_follow_txn';

interface RecommendedPost {
    postId: number;
    text: string;
    userId: number;
    likes: number;
    sport_id: number;
    comments: number;
    timestamp: Date;
    popularityScore: number;
}

const getfeedRecomendationService = async (userId: number) => {
    try {
        const userProfile = await getUserProfile(userId);
        
        if (!userProfile || !userProfile.interests) {
            console.log('User profile or interests not available.');
            return [];
        }

        const userLikedAndCommentedPosts = await getUserLikedAndCommentedPosts(userId);
        const followedUsersPosts = await getFollowedUsersPosts(userId);

        const allPosts: { id: number; sport_id: number | null; likes: number | null; comments: number | null; text: string | null; userId: number; created: Date }[] = [];

        userLikedAndCommentedPosts.forEach(post => {
            allPosts.push({
                id: post.id,
                sport_id : post.sport_id,
                likes: post.likes,
                comments: post.comments,
                text: post.text,
                userId: post.user_id, 
                created: post.created || new Date() 
            });
        });

        followedUsersPosts.forEach(post => {
            if (post.post_id !== null) {
                allPosts.push({
                    id: post.post_id !== undefined ? post.post_id : 0, 
                    sport_id: null, 
                    likes: null,
                    comments: null, 
                    text: null, 
                    userId: post.follower_id !== undefined ? post.follower_id : 0, 
                    created: post.created || new Date()
                });
            }
        });

        const userInterests = userProfile.interests.map(interest => interest.sport_id.toString());
        const filteredPosts = filterPostsByInterests(allPosts, userInterests);

        // Map filtered posts to RecommendedPost format and calculate popularity score
        const recommendedPosts: RecommendedPost[] = filteredPosts.map(post => ({
            postId: post.id,
            sport_id: post.sport_id,
            text: post.text!,
            userId: post.userId,
            likes: post.likes!,
            comments: post.comments!,
            timestamp: post.created,
            popularityScore: calculatePopularityScore(post.likes!, post.comments!)
        }));

        recommendedPosts.sort((a, b) => b.popularityScore - a.popularityScore || b.timestamp.getTime() - a.timestamp.getTime());

        return recommendedPosts.slice(0, 10);
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

const getUserProfile = async (userId: number) => {

    const userInterests = await getUserInterests(userId);
    const followedUsers = await getFollowedUsers(userId);

    return { userId, interests: userInterests, followedUsers };
};

const getUserInterests = async (userId: number)=> {
    const userInterests = await db.posts.findAll({
        attributes: [PostsColumns.SPORT_ID],
        where: { 
            [PostsColumns.USER_ID] : userId
        },
        raw : true
    })
    return userInterests;
};

const getFollowedUsers = async (userId: number) => {

    const followedUsers = await db.user_follow_txn.findAll({ 
        where: { 
            [userFollowTxnColumns.USER_ID] : userId
        } ,
        raw : true
    });
    
    return followedUsers;
};

const getUserLikedAndCommentedPosts = async (userId: number) => {

    const userLikedAndCommentedPosts = await db.posts.findAll({ 
        attributes : [PostsColumns.ID, PostsColumns.USER_ID, PostsColumns.TEXT, PostsColumns.SPORT_ID, PostsColumns.LIKES, PostsColumns.COMMENTS],
        where: { 
            [PostsColumns.USER_ID] : userId, [Op.or]: [{ likes: { [Op.gt]: 0 } }, { comments: { [Op.gt]: 0 } }] 
        },
        raw : true
    }); 

    return userLikedAndCommentedPosts;
};

const getFollowedUsersPosts = async (userId: number) => {

    const followedUsersPost = await db.user_follow_txn.findAll({ 
        attributes : [
            userFollowTxnColumns.FOLLOWER_ID,
            userFollowTxnColumns.POST_ID
        ],
        where: { 
            [userFollowTxnColumns.USER_ID]: userId
        },
        raw : true
    });

    return followedUsersPost;
};

const filterPostsByInterests = (posts: any[], userInterests: string[]) => {

    const resData = posts.map((post: any) => {

        const userInterest = userInterests.find(interest => interest === String(post?.sport_id));

        return {
            ...post,
            userInterest: userInterest || 'Unknown'
        };
    });
    
    return resData;
};


const calculatePopularityScore = (likes: number, comments: number): number => {
    return likes + comments;
};


export { getfeedRecomendationService }
