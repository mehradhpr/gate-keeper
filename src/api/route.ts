
export async function GET(request: Request) {
  return new Response('GET request')
}

export async function POST(request: Request) {
  return new Response('POST request')
}

export async function DELETE(request: Request) {
  return new Response('DELETE request')
}

export async function PATCH(request: Request) {
  return new Response('PATCH request')
}