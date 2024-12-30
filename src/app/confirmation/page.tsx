"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import {sendDiscordNotification} from "@/api/send-message-discord";

const Confirmacao: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [usuarioData, setUsuarioData] = useState<{ name: string; pretendente: string } | null>(null);
    const [botaoNaoPosicao, setBotaoNaoPosicao] = useState<{ top: number; left: number }>({
        top: 250,
        left: 250,
    });

    useEffect(() => {
        if (pathname) {
            const searchParams = new URLSearchParams(window.location.search);
            const usuario = searchParams.get("usuario");

            if (usuario) {
                try {
                    // Decodifica o parâmetro 'usuario' da URL
                    const decodedUsuario = decodeURIComponent(usuario);
                    const [name, email, discordWebHookURL] = decodedUsuario.split(",");

                    setUsuarioData({ name, pretendente: email });
                } catch (error) {
                    console.error("Erro ao processar os dados do usuário:", error);
                }
            }
        }
    }, [pathname]);
    const handleSim = async () => {
        await sendDiscordNotification(usuarioData?.pretendente);
        router.push("/accepted")
    };

    const handleNao = () => {
        const top = Math.random() * 600;
        const left = Math.random() * 600;
        setBotaoNaoPosicao({ top, left });
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 relative">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center drop-shadow-md">Gostaria de saber se você quer sair comigo rsrsrs</h1>
            <div className="flex gap-8 relative">
                <Button
                    onClick={handleSim}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                >
                    Sim
                </Button>
                <Button
                    onMouseEnter={handleNao}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 absolute"
                    style={{
                        top: `${botaoNaoPosicao.top}%`,
                        left: `${botaoNaoPosicao.left}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    Não
                </Button>
            </div>
        </div>
    );
};

export default Confirmacao;
