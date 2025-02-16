from playwright.sync_api import Page, expect
import re
from playwright.sync_api import Playwright, sync_playwright, expect


def test_end2end(playwright: Playwright):
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("http://localhost:5173/login")
    page.get_by_role("textbox", name="Username").click()
    page.get_by_role("textbox", name="Username").fill("Jorj")
    page.get_by_role("textbox", name="Username").press("Tab")
    page.get_by_role("textbox", name="Password").fill("Password1:")
    page.get_by_role("button", name="Se connecter").click()
    expect(page.get_by_role("heading", name="Mes Cartes")).to_be_visible()
    page.get_by_role("button", name="Ajouter une carte").click()
    page.get_by_role("textbox", name="Question").click()
    page.get_by_role("textbox", name="Question").fill("Qu'est-ce que le sens de la vie ?")
    page.get_by_role("textbox", name="Réponse").click()
    page.get_by_role("textbox", name="Réponse").fill("42")
    page.get_by_role("textbox", name="Tag").click()
    page.get_by_role("textbox", name="Tag").fill("Lifestyle")
    page.get_by_role("button", name="Créer la fiche").click()
    page.get_by_role("button", name="Toutes mes cartes").click()
    expect(page.get_by_role("heading", name="Qu'est-ce que le sens de la")).to_be_visible()
    expect(page.get_by_role("main")).to_contain_text("Qu'est-ce que le sens de la vie ?")
    page.get_by_role("button", name="Lancer le quiz").click()
    expect(page.get_by_text("Quiz", exact=True)).to_be_visible()
    expect(page.get_by_role("main")).to_contain_text("Quiz")
    page.get_by_role("textbox", name="Your Answer").click()
    page.get_by_role("textbox", name="Your Answer").fill("I don't know")
    page.get_by_role("button", name="Submit").click()
    page.get_by_role("button", name="Correct", exact=True).click()
    # ---------------------
    context.close()
    browser.close()