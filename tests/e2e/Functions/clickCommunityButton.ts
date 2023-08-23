import { expect, type Page } from "@playwright/test";

export default async (page: Page) => {
  const joinCommunityButton = page.getByRole('button', { name: 'Join the community' })

  await joinCommunityButton.click();
  await expect(page.url()).toContain('https://discord.com/invite/')
}
