import axios from 'axios';

export default async function handler(req, res) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN; // Access token stored in environment variables
  const instagramGraphUrl = 'https://graph.instagram.com/me/media';

  try {
    const response = await axios.get(instagramGraphUrl, {
      params: {
        fields: 'id,caption,media_type,media_url,thumbnail_url,permalink',
        access_token: accessToken,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    res.status(500).json({ error: 'Failed to fetch Instagram media' });
  }
}
