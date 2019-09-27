const graphql = require("graphql");
const _ = require("lodash");
const Post = require("../models/post");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql;
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    groupId: { type: GraphQLString },
    authorId: { type: GraphQLString },
    image: { type: GraphQLString },
    teaser: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    likes: { type: GraphQLInt },
    viewed: { type: GraphQLInt },
    buy: { type: GraphQLBoolean }
  })
});
const CourseType = new GraphQLObjectType({
  name: "Course",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    language: { type: GraphQLString },
    level: { type: GraphQLString },
    courses: {
      type: new GraphQLList(CourseType),
      resolve(parent, args) {
        return Course.find();
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      args: {
        courseId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Category.find({ courseId: args.courseId });
      }
    },
    subCategories: {
      type: new GraphQLList(SubCategoryType),
      args: {
        categoryId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Category.find({ categoryId: args.categoryId });
      }
    },
    word: {
      type: new GraphQLList(CategoryType),
      args: {
        categoryId: { type: GraphQLID },
        courseId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Category.find({ courseId: args.courseId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Post.findById(args._id);
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      args: {
        groupId: { type: GraphQLID },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        if (args.groupId) {
          return Post.find({ groupId: args.groupId });
        }
        if (args.authorId) {
          return Post.find({ authorId: args.authorId });
        }
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        groupId: {
          type: GraphQLString
        },
        authroId: {
          type: GraphQLString
        },
        title: {
          type: new GraphQLNonNull(GraphQLString)
        },
        teaser: {
          type: new GraphQLNonNull(GraphQLString)
        },
        text: {
          type: new GraphQLNonNull(GraphQLString)
        },
        image: {
          type: new GraphQLNonNull(GraphQLString)
        },
        viewed: {
          type: new GraphQLNonNull(GraphQLInt)
        },
        likes: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve(parent, args) {
        let post = new Post({
          groupId: args.groupId,
          authorId: args.authorId,
          title: args.title,
          teaser: args.title,
          text: args.text,
          image: args.image,
          viewed: args.viewed,
          likes: args.liked
        });
        return post.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
