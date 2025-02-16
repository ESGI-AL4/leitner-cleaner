import re
from playwright.sync_api import Page, expect

def test_quiz_has_title(page: Page):
    page.goto("http://localhost:5173/quiz")
    expect(page.get_by_text("Quiz", exact=True)).to_be_visible()

def test_quiz_has_textbox(page: Page):
    page.goto("http://localhost:5173/quiz")
    expect(page.get_by_role("textbox", name="Your Answer")).to_be_visible()
