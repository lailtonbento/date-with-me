export const sendDiscordNotification = async (pretendente) => {
    const discordWebhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

    const message = {
        content: `Parabens, ${pretendente} aceitou o convite para sair! 🎉🎉`,
        username: "Convite Bot",
    };

    try {
        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
};

