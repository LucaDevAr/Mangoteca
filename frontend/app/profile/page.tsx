'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Book, BookOpen, Clock, Heart, Settings, User, Edit, List, Trophy, Users, Bookmark, X, Search, Bell } from 'lucide-react'
import Header from '@/components/Header'

interface UserProfile {
  username: string
  avatarUrl: string
  joinDate: string
  bio: string
  readCount: number
  favoriteCount: number
  readingTime: number
  favoriteGenres: string[]
  recentlyRead: {
    id: string
    title: string
    coverUrl: string
    progress: number
  }[]
  favorites: {
    id: string
    title: string
    coverUrl: string
  }[]
  planToRead: {
    id: string
    title: string
    coverUrl: string
  }[]
  achievements: {
    id: string
    title: string
    description: string
    icon: React.ReactNode
  }[]
  following: number
  followers: number
  settings: {
    preferredLanguage: string
    adultContentFilter: boolean
  }
}

const userProfile: UserProfile = {
  username: "MangaLover123",
  avatarUrl: "/placeholder.svg?height=100&width=100",
  joinDate: "Joined May 2023",
  bio: "Avid manga reader and collector. I love exploring new series and discussing plot theories!",
  readCount: 250,
  favoriteCount: 50,
  readingTime: 500,
  favoriteGenres: ["Shonen", "Seinen", "Romance", "Horror"],
  recentlyRead: [
    { id: "1", title: "Naruto", coverUrl: "/placeholder.svg?height=150&width=100", progress: 75 },
    { id: "2", title: "One Piece", coverUrl: "/placeholder.svg?height=150&width=100", progress: 90 },
    { id: "3", title: "Attack on Titan", coverUrl: "/placeholder.svg?height=150&width=100", progress: 100 },
  ],
  favorites: [
    { id: "4", title: "Death Note", coverUrl: "/placeholder.svg?height=150&width=100" },
    { id: "5", title: "Fullmetal Alchemist", coverUrl: "/placeholder.svg?height=150&width=100" },
    { id: "6", title: "My Hero Academia", coverUrl: "/placeholder.svg?height=150&width=100" },
  ],
  planToRead: [
    { id: "7", title: "Demon Slayer", coverUrl: "/placeholder.svg?height=150&width=100" },
    { id: "8", title: "Jujutsu Kaisen", coverUrl: "/placeholder.svg?height=150&width=100" },
  ],
  achievements: [
    { id: "1", title: "Bookworm", description: "Read 100 chapters", icon: <BookOpen className="h-6 w-6" /> },
    { id: "2", title: "Night Owl", description: "Read for 10 hours", icon: <Clock className="h-6 w-6" /> },
  ],
  following: 50,
  followers: 75,
  settings: {
    preferredLanguage: "English",
    adultContentFilter: true,
  },
}

export default function UserProfile() {
  const [profile, setProfile] = useState(userProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('recent')

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updatedProfile }))
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto p-4 space-y-6 pt-[120px]">
        <div className="bg-background-alt rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image src={profile.avatarUrl} alt={profile.username} width={96} height={96} className="object-cover" />
            </div>
            <div className="space-y-2 text-center md:text-left flex-grow">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-text">{profile.username}</h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-full hover:bg-background text-primary"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <p className="text-text-muted">{profile.joinDate}</p>
              <p className="max-w-md text-text">{profile.bio}</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <div className="text-center">
                  <p className="font-semibold text-text">{profile.following}</p>
                  <p className="text-sm text-text-muted">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-text">{profile.followers}</p>
                  <p className="text-sm text-text-muted">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background-alt rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-text">Manga Read</h2>
              <BookOpen className="h-4 w-4 text-text-muted" />
            </div>
            <p className="text-2xl font-bold mt-2 text-text">{profile.readCount}</p>
          </div>
          <div className="bg-background-alt rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-text">Favorites</h2>
              <Heart className="h-4 w-4 text-text-muted" />
            </div>
            <p className="text-2xl font-bold mt-2 text-text">{profile.favoriteCount}</p>
          </div>
          <div className="bg-background-alt rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-text">Reading Time</h2>
              <Clock className="h-4 w-4 text-text-muted" />
            </div>
            <p className="text-2xl font-bold mt-2 text-text">{profile.readingTime} hours</p>
          </div>
        </div>

        <div className="bg-background-alt rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2 text-text">Favorite Genres</h2>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteGenres.map((genre) => (
              <span key={genre} className="px-2 py-1 bg-background rounded-full text-sm text-text">{genre}</span>
            ))}
          </div>
        </div>

        <div className="bg-background-alt rounded-lg shadow-md p-4">
          <div className="flex border-b border-border mb-4">
            <button
              className={`px-4 py-2 ${activeTab === 'recent' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'}`}
              onClick={() => setActiveTab('recent')}
            >
              Recently Read
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'favorites' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'}`}
              onClick={() => setActiveTab('favorites')}
            >
              Favorites
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'plan' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'}`}
              onClick={() => setActiveTab('plan')}
            >
              Plan to Read
            </button>
            <button
              className={`px-4 py-2 ${activeTab === 'achievements' ? 'border-b-2 border-primary text-primary' : 'text-text-muted'}`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
          </div>
          {activeTab === 'recent' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.recentlyRead.map((manga) => (
                <div key={manga.id} className="flex items-center space-x-4 bg-background p-4 rounded-lg">
                  <Image src={manga.coverUrl} alt={manga.title} width={100} height={150} className="rounded-md" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-text">{manga.title}</h3>
                    <div className="w-full bg-background-alt rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: `${manga.progress}%` }}></div>
                    </div>
                    <p className="text-sm text-text-muted">{manga.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'favorites' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.favorites.map((manga) => (
                <div key={manga.id} className="flex items-center space-x-4 bg-background p-4 rounded-lg">
                  <Image src={manga.coverUrl} alt={manga.title} width={100} height={150} className="rounded-md" />
                  <h3 className="text-lg font-semibold text-text">{manga.title}</h3>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'plan' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.planToRead.map((manga) => (
                <div key={manga.id} className="flex items-center space-x-4 bg-background p-4 rounded-lg">
                  <Image src={manga.coverUrl} alt={manga.title} width={100} height={150} className="rounded-md" />
                  <h3 className="text-lg font-semibold text-text">{manga.title}</h3>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {profile.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-4 bg-background p-4 rounded-lg">
                  <div className="bg-background-alt p-2 rounded-full text-primary">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text">{achievement.title}</h3>
                    <p className="text-sm text-text-muted">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-background-alt rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-text">Reading Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">Preferred Language</p>
                <p className="text-sm text-text-muted">Set your preferred manga language</p>
              </div>
              <select
                value={profile.settings.preferredLanguage}
                onChange={(e) => setProfile((prev) => ({ ...prev, settings: { ...prev.settings, preferredLanguage: e.target.value } }))}
                className="border border-border rounded p-1 bg-background text-text"
              >
                <option value="English">English</option>
                <option value="Japanese">Japanese</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">Adult Content Filter</p>
                <p className="text-sm text-text-muted">Hide adult content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={profile.settings.adultContentFilter}
                  onChange={(e) => setProfile((prev) => ({ ...prev, settings: { ...prev.settings, adultContentFilter: e.target.checked } }))}
                />
                <div className="w-11 h-6 bg-background-alt peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="fixed inset-0 bg-text bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-text">Edit Profile</h2>
                <button onClick={() => setIsEditing(false)} className="text-text-muted hover:text-text">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-text">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile((prev) => ({ ...prev, username: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50 bg-background text-text"
                  />
                </div>
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-text">Bio</label>
                  <textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-border shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50 bg-background text-text"
                  ></textarea>
                </div>
                <button
                  onClick={() => handleProfileUpdate(profile)}
                  className="w-full bg-primary text-background rounded-md py-2 hover:bg-primary-dark transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}