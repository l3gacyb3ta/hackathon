import { useRouter } from 'next/router'

export default function hu({ entry }) {
  return(
    <p>{entry.name}</p>
  )
}

import { getPaths, getPostData } from '../../lib/airtable'

export async function getStaticPaths() {
  const paths = await getPaths();
  return  { 
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps() {
  const data = getPostData();
  
  const router = useRouter();
  const { id } = router.query;

  for (record in data) {
    if (record.fields.Name.toLowerCase() == id) {
      console.log(record)
    }
  }

  const entry = {
    name: "Hello",
    person: "hi"
  }
  return { 
    props: {
        entry
      }
    }
}