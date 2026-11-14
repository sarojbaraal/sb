<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> (RSS feed)</title>
        <style>
          body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; margin: 0; background: #f5f7fb; color: #14203a; line-height: 1.55; }
          main { max-width: 680px; margin: 0 auto; padding: 32px 20px 64px; }
          .note { background: #eaf1fe; border: 1px solid #c9d8f7; border-radius: 10px; padding: 14px 16px; font-size: 14px; }
          h1 { font-size: 28px; margin: 24px 0 6px; letter-spacing: -.02em; }
          p.d { color: #5a667d; margin: 0 0 24px; }
          article { background: #fff; border: 1px solid #dde3ee; border-radius: 10px; padding: 16px 18px; margin-bottom: 12px; }
          article h2 { font-size: 18px; margin: 0 0 4px; } a { color: #2f6fed; }
          time { color: #5a667d; font-size: 13px; }
          .empty { color: #5a667d; }
        </style>
      </head>
      <body>
        <main>
          <p class="note"><strong>This is a feed, not a web page.</strong> Copy this page's address into a feed reader (Feedly, Inoreader, NetNewsWire) to follow new posts.</p>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="d"><xsl:value-of select="/rss/channel/description"/></p>
          <xsl:choose>
            <xsl:when test="count(/rss/channel/item) = 0"><p class="empty">No notes published yet. Check back soon.</p></xsl:when>
            <xsl:otherwise>
              <xsl:for-each select="/rss/channel/item">
                <article>
                  <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
                  <time><xsl:value-of select="substring(pubDate, 1, 16)"/></time>
                  <p><xsl:value-of select="description"/></p>
                </article>
              </xsl:for-each>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
