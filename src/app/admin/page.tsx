"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo login - in production, use proper authentication
    if (
      credentials.username === "admin" &&
      credentials.password === "password"
    ) {
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid credentials. Use admin/password for demo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-3xl font-bold text-rose-600 hover:text-rose-700 transition-colors"
          >
            Elena Rose
          </Link>
          <p className="text-gray-600 mt-2">Admin Dashboard</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-light text-gray-800">
              Welcome Back
            </CardTitle>
            <CardDescription>Sign in to manage your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="border-rose-200 focus:border-rose-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    className="border-rose-200 focus:border-rose-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg transition-colors duration-200"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-rose-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Demo Credentials:</strong>
                <br />
                Username: admin
                <br />
                Password: password
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/"
                className="text-sm text-rose-600 hover:text-rose-700 transition-colors"
              >
                ← Back to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
