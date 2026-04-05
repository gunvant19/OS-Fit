import fs from 'fs';

const screens = [
  { name: 'UserDashboard', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Y0MmQ5Nzg1YzdkNDQ4YjJhNGIzZjVjZmYyMjRjYTk1EgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'BookingPayment', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzUwOWIxYjYwMGY3YzQ5YjViZjAyYTVlOGU4ODc1OTRhEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'Services', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY0Yzc0OWFkZDkzZmUwMWViNTUxMWRhMmQ3ZjRlEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'Contact', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I3ZGNhNjg0MTllNTRhM2JhNTg5OTMwYzgxOTlkZTVmEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'About', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzNkMzNmMWM3OWY1ZTQyNDFhOGMzYTE3OGI5MjNmZWM1EgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'MembershipPlans', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzVmMjcyYTIxNGQ2MDQ1ZTQ4ODQ1ZjUzMDBmNTUxYTFmEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'BMICalculator', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMyZmUxMmU3NTAwZjQ1ZGNiMjYyNzJhYjAxMGJlNWZhEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'Auth', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzZkNTc5OWNmZWYyZDRmNGE4MTNlYWVjNDE1N2M4M2YyEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'Schedule', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzcyZmM2MGZhNGE3OTQ5Y2U4NmEyZmI3MTVmMzlmMTUzEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
  { name: 'Trainers', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY0Yzc0YjZjZjAwZTUwMWViNTUxMWRhMmQ3ZjRlEgsSBxC-zef1-BEYAZIBIwoKcHJvamVjdF9pZBIVQhMxODYwNjY0ODY5NDA0OTk3Njgy&filename=&opi=89354086' },
];

async function downloadAll() {
  for (const screen of screens) {
    console.log(`Downloading ${screen.name}...`);
    try {
      const res = await fetch(screen.url);
      const text = await res.text();
      
      // Extract the body inside <main></main>
      let content = text;
      // Also we need to convert class= to className=
      content = content.replace(/class="/g, 'className="');
      // For images, add closing tags if missing, though HTML might have it or not, we can fix it later.
      content = content.replace(/<img(.*?)>/g, (match) => {
        if (match.endsWith('/>')) return match;
        return match.replace(/>$/, ' />');
      });
      content = content.replace(/<input(.*?)>/g, (match) => {
        if (match.endsWith('/>')) return match;
        return match.replace(/>$/, ' />');
      });
      // Extract the main body
      const mainRegex = /<main[^>]*>([\s\S]*?)<\/main>/i;
      const match = content.match(mainRegex);
      const innerContent = match ? match[1] : `<div>Cannot extract main content</div>`;
      
      const componentCode = `export default function ${screen.name}() {
  return (
    <main className="flex-grow">
      ${innerContent}
    </main>
  );
}
`;
      fs.writeFileSync(`src/pages/${screen.name}.jsx`, componentCode);
      console.log(`Saved src/pages/${screen.name}.jsx`);
    } catch (e) {
      console.error(`Error with ${screen.name}:`, e.message);
    }
  }
}

downloadAll();
