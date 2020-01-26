import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class CatsResolver {
  // constructor(
  //   private readonly authorsService: AuthorsService,
  //   private readonly postsService: PostsService,
  // ) {}

  @Query(() => String)
  async hello() {
    return 'hello world'
  }

  // @ResolveProperty()
  // async posts(@Parent() author) {
  //   const { id } = author;
  //   return this.postsService.findAll({ authorId: id });
  // }
}