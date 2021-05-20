import Image from 'next/image'
import { Container, Card, Grid, Text, Heading, Link } from 'theme-ui'
import getPosts from '../lib/airtable'
import styles from '../styles/Home.module.css'



export default function Home({ posts }) {
  // console.log(posts)

  return (
    <div className={styles.main}>
      <Grid
      columns={[null, 2, 3]}
          gap={3}
          sx={{ code: { mt: 1, ml: -1, fontSize: 0 } }}
      >
        
          {posts.map(post => (
            <Link href={'/project/'+post.fields.Name.toLowerCase()} key={post.fields.id}>
            <Card
              sx={{
                backgroundImage: t => t.util.gx('cyan', 'blue'),
                color: 'white'
              }}
            >
              <Heading variant="headline" as="h3" my={ 0 }>
                {post.fields.Name}
              </Heading>

              <Text variant="lead" sx={{ right:0 }}>
                {post.fields.People}
              </Text>

              <br />
            </Card>
          </Link>
          ))}
      
      </Grid>
    </div>
  )
}


export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
      revalidate: 1,
    },
  };
}