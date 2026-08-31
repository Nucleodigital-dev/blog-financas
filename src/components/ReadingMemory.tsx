"use client";

import Link from "next/link";
import { Bell, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  CONSENT_UPDATED_EVENT,
  FAVORITE_CATEGORIES_KEY,
  LATEST_ARTICLE_NOTIFIED_KEY,
  LATEST_ARTICLE_SEEN_KEY,
  PrivacyPreferences,
  dispatchPreferenceUpdate,
  readStoredPrivacyPreferences,
} from "@/lib/privacy";
import type { StoredArticle } from "./ArticleEngagement";

type LatestArticle = StoredArticle & {
  createdAt?: string | null;
};

type ReadingMemoryProps = {
  latestArticle?: LatestArticle | null;
};

function allowsPreferenceMemory(preferences: PrivacyPreferences | null) {
  return Boolean(preferences?.preferences);
}

function allowsNotifications(preferences: PrivacyPreferences | null) {
  return Boolean(preferences?.notifications) && "Notification" in window && Notification.permission === "granted";
}

export function ReadingMemory({ latestArticle }: ReadingMemoryProps) {
  const [showLatestNotice, setShowLatestNotice] = useState(false);

  const refresh = useCallback(() => {
    const preferences = readStoredPrivacyPreferences();
    const canRemember = allowsPreferenceMemory(preferences);

    if (!canRemember) {
      setShowLatestNotice(false);
      return;
    }

    if (!latestArticle) {
      setShowLatestNotice(false);
      return;
    }

    const latestSeen = localStorage.getItem(LATEST_ARTICLE_SEEN_KEY);
    if (latestSeen !== latestArticle.slug) {
      setShowLatestNotice(true);

      const latestNotified = localStorage.getItem(LATEST_ARTICLE_NOTIFIED_KEY);
      if (latestNotified !== latestArticle.slug && allowsNotifications(preferences)) {
        new Notification("Novo artigo no Grana em Ordem", {
          body: latestArticle.title,
          icon: latestArticle.image || "/logo.png",
        });
        localStorage.setItem(LATEST_ARTICLE_NOTIFIED_KEY, latestArticle.slug);
      }
    } else {
      setShowLatestNotice(false);
    }
  }, [latestArticle]);

  useEffect(() => {
    const timer = window.setTimeout(refresh, 0);
    window.addEventListener(CONSENT_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const dismissLatestNotice = () => {
    if (latestArticle) {
      localStorage.setItem(LATEST_ARTICLE_SEEN_KEY, latestArticle.slug);
      dispatchPreferenceUpdate();
    }
    setShowLatestNotice(false);
  };

  if (!showLatestNotice) return null;

  return (
    <section className="reading-memory" aria-label="Preferências de leitura">
      {showLatestNotice && latestArticle && (
        <div className="latest-article-notice">
          <div>
            <span>
              <Bell size={16} aria-hidden="true" />
              Novo artigo
            </span>
            <h2>{latestArticle.title}</h2>
          </div>
          <div>
            <Link href={latestArticle.href} className="btn btn-primary" onClick={dismissLatestNotice}>
              Ler agora
            </Link>
            <button type="button" className="btn btn-secondary" onClick={dismissLatestNotice}
              style={{ color: "#EDD9A3", background: "rgba(255,255,255,0.1)", borderColor: "rgba(201,162,72,0.4)" }}>
              Dispensar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export function FavoriteCategoryButton({ slug, label }: { slug: string; label: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const favorites = JSON.parse(localStorage.getItem(FAVORITE_CATEGORIES_KEY) || "[]");
        setIsFavorite(Array.isArray(favorites) && favorites.includes(slug));
      } catch {
        setIsFavorite(false);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [slug]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITE_CATEGORIES_KEY) || "[]");
    const normalized = Array.isArray(favorites) ? favorites : [];
    const next = normalized.includes(slug)
      ? normalized.filter((item) => item !== slug)
      : [slug, ...normalized];

    localStorage.setItem(FAVORITE_CATEGORIES_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(slug));
    dispatchPreferenceUpdate();
  };

  return (
    <button
      type="button"
      className={isFavorite ? "favorite-category-button active" : "favorite-category-button"}
      onClick={toggleFavorite}
      aria-label={isFavorite ? `Remover ${label} das favoritas` : `Favoritar ${label}`}
    >
      <Star size={16} aria-hidden="true" />
    </button>
  );
}

