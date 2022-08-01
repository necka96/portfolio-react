import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: "wwejr0s0",
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token:
    "sko515MWUohev3pk33FcXA1oegBeMLvUxqXUIYZUoRlQPdQPNolfanvokS3TAWJOttka74ZhXUjucGnAFapyQVERx0TdyhfY4GAqP9l36BfrKJz0EXS0czukqueo1rRfgVvR1YBd2SQtmniOkmxDE5kKNGKZ80CDyxbvyjKNg8BHHkkHyxRW",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
