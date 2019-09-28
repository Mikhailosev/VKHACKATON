const graphql = require("graphql");
const _ = require("lodash");
const Post = require("../models/post");
const Group = require("../models/group");
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
    viewed: { type: GraphQLInt },
    buy: { type: GraphQLBoolean },
    content: { type: GraphQLString }
  })
});
const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    groupId: { type: GraphQLString },
    authorId: { type: GraphQLString },
    name: { type: GraphQLString }
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
      resolve(parent, args) {
        return Post.find();
      }
    },
    group: {
      type: GroupType,
      args: {
        _id: {
          type: GraphQLID
        },
        name: { type: GraphQLString },
        authorId: { type: GraphQLString },
        groupId: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (args._id) {
          return Group.find({ _id: args._id });
        }
        if (args.groupId) {
          return Group.find({ groupId: args.groupId });
        }
        if (args.authorId) {
          return Group.find({ authorId: args.authorId });
        }
        if (args.name) {
          return Group.find({ name: args.name });
        }
      }
    }
  }
});
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addGroup: {
      type: GroupType,
      args: {
        groupId: {
          type: GraphQLString
        },
        authorId: {
          type: GraphQLString
        },
        name: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        let group = new Group({
          groupId: args.groupId,
          authorId: args.authorId,
          name: args.name
        });
        return group.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
