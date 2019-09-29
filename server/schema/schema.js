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
    id: { type: GraphQLID },
    groupId: { type: GraphQLString },
    authorId: { type: GraphQLString },
    image: { type: GraphQLString },
    teaser: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    viewed: { type: GraphQLInt },
    buy: { type: GraphQLBoolean },
    content: { type: GraphQLString },
    timetoread: { type: GraphQLInt }
  })
});
const GroupType = new GraphQLObjectType({
  name: "Group",
  fields: () => ({
    id: { type: GraphQLString },
    groupId: { type: GraphQLString },
    authorId: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Post.findById(args.id);
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
        id: {
          type: GraphQLID
        },
        name: { type: GraphQLString },
        authorId: { type: GraphQLString },
        groupId: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (args.id) {
          return Group.find({ id: args.id });
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
        }
      },
      resolve(parent, args) {
        let group = new Group({
          groupId: args.groupId,
          authorId: args.authorId
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
