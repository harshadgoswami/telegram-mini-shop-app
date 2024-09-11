## How to start Next.JS application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## What Environment variable need to setup

```bash
MONGODB_URI= USE_MONGODB_ATLAS_CONNECTION_STRING
MONGODB_DB = YOUR_DATABASE_NAME

NEXTAUTH_URL = http://localhost:3000

NEXT_PUBLIC_BOT_TOKEN = BOT_TOKEN_PROVIDED_BY_BOT_FATHER_WHILE_BOTCREATION

NEXT_PUBLIC_PAYMENT_PROVIDER_TOKEN = PAYMENT_METHOD_TOKEN_PROVIDED_BY_TELEGRAM_AFTER_LINKING_PAYMENT_PROVIDER
```

## How to create Telegram Bot

- You required Telegram account it is prerequisites.
- Open BotFather: Search for "BotFather" in Telegram and start a chat with it.
- Start a new bot: Send the command `/newbot` to BotFather.
- Choose a name: BotFather will prompt you to choose a name for your bot. This will be the name that users will see when interacting with it.
- Choose a username: You'll also need to choose a unique username for your bot. This will be used in the bot's URL (e.g., @my_bot).
- Receive the API token: BotFather will send you an API token after you've chosen a name and username. Keep this token safe, as it's essential for accessing your bot's functionality.

## How to edit Existing Bot Information

- [Recording](https://www.awesomescreenshot.com/video/31398955)
- in botfather enter command /mybot and that will guide you how you can edit bot informations from there
- we can link stripe paymentgateway with telegram and after successful linking it provide the provider id that we need to use in createInvoice API.

## How webhook capture the update ?

- [Reference](https://github.com/harshadgoswami/my-documentations/blob/master/telegram/how-to-setup-webhook.md)

## Telegram Star payment integretion steps ?

- [Reference](https://core.telegram.org/bots/payments-stars#implementing-payments)
- [Refer](https://github.com/harshadgoswami/telegram-mini-shop-app/blob/master/pages/api/webhook/index.ts) for how i implemented that steps.
