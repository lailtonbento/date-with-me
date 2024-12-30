"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";
import { useRouter } from "next/navigation";


export function CardForm() {
    const [usuario, setUsuario] = useState({ name: "", pretendente: "" });
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (usuario.name && usuario.pretendente) {
            const usuarioString = `${usuario.name},${usuario.pretendente}`;
            const url = `/confirmation?usuario=${encodeURIComponent(usuarioString)}`;
            router.push(url);
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUsuario((prev) => ({ ...prev, [id]: value }));
    };

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle>Configure your date</CardTitle>
                <CardDescription>to receive a notification on discord when the date is accepted</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Seu nome</Label>
                            <Input
                                id="name"
                                type="text"
                                value={usuario.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="pretendente">Pretendente</Label>
                            <Input
                                id="pretendente"
                                type="text"
                                value={usuario.pretendente}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <CardFooter className="flex justify-center items-center mt-6">
                        <Button className="mt-0"
                                type="submit">Next</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}
