const getContent = async () => {
  const res = await fetch(
    `https://content.guardianapis.com/football/2023/aug/05/thats-our-job-matildas-ready-to-step-up-if-denmark-match-goes-to-penalties?api-key=${process.env.GUARDIAN_API_KEY}&show-fields=all`
  );

  if (!res.ok) {
    throw new Error('Something went wrong');
  }
  return res.json();
};

export default async function Page() {
  const data = await getContent();
  const bodyContent = data?.response?.content?.fields?.bodyText;

  return <div className={'max-w-lg pt-6 text-gray-300'}>{bodyContent}</div>;
}
