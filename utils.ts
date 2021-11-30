export async function loadAsBlob(f: string): Promise<string> {
  const str = await (await fetch(f)).text();
  // console.log(f, ":", str);
  const blob = new Blob( [str], {type: 'application/javascript'} );
  return URL.createObjectURL(blob);
}
