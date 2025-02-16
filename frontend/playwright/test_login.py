import re
from playwright.sync_api import Page, expect


def test_login(page: Page):
    page.goto("http://localhost:5173/login")
    expect(page.locator("#root")).to_contain_text("Connexion")