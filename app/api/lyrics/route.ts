// app/api/hello/route.ts

// export const runtime = 'nodejs';
// This is required to enable streaming
// export const dynamic = 'force-dynamic';

const summaries = [
  { value: "\n\n" },
  { value: "So Sgt. Pepper took you by surprise" },
  { value: "You better see right through that mother's eyes" },
  { value: 'Those freaks was right when they said you was dead' },
  { value: "The one mistake you made was in your head" },
  { value: "\n\n" },
  { value: "Ah, how do you sleep?" },
  { value: "Ah, how do you sleep at night?" },
  { value: "\n\n" },
  { value: "You live with straights who tell you you was king" },
  { value: "Jump when your momma tell you anything" },
  { value: "The only thing you done was yesterday" },
  { value: "And since you're gone you're just another day" },
  { value: "\n\n" },
  { value: "Ah, how do you sleep?" },
  { value: "Ah, how do you sleep at night?" },
  { value: "\n\n" },
  { value: "Ah, how do you sleep?" },
  { value: "Ah, how do you sleep at night?" },
  { value: "\n\n" },
  { value: "A pretty face may last a year or two" },
  { value: "But pretty soon they'll see what you can do" },
  { value: "The sound you make is muzak to my ears" },
  { value: "You must have learned something in all those years" },
  { value: "\n\n" },
  { value: "Ah, how do you sleep?" },
  { value: "Ah, how do you sleep at night?" },
  { value: "\n\n" },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generate = async (writer, encoder) => {
  const lyricsLength = summaries.length - 1;
  for (let i = 0; i++, i <= lyricsLength; ) {
    try {
      const test = encoder.encode(summaries[i])
      const decoder = new TextDecoder();

      await writer.write(encoder.encode(`data: ${JSON.stringify(summaries[i])} \n\n`));
    } catch (error) {
      console.error('Could not JSON stringify stream message', onmessage, error);
    }
    
    if (i === lyricsLength) writer.close();

    await sleep(2000);
  }
};

export async function GET(request: Request) {
  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  generate(writer, encoder);
  
  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
