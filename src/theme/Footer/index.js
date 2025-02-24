import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useThemeConfig } from '@docusaurus/theme-common';
import styles from './styles.module.css';

export default function CustomFooter() {
  // Get footer configuration from Docusaurus config
  const { footer } = useThemeConfig();
  
  if (!footer) {
    return null;
  }
  
  // Get links and organize them by title
  const { links = [], copyright } = footer;
  
  
  // Functions to render links
  const renderLink = (link) => (
    <li key={link.label} className={styles.linkItem}>
      <Link 
        to={link.to} 
        href={link.href} 
        className={styles.link}
      >
        {link.label}
      </Link>
    </li>
  );

  // Render a link category section
  const renderLinkCategory = (category, index) => {
    // Skip rendering categories with no items
    if (!category.items || category.items.length === 0) {
      return null;
    }
    
    // Use the display title mapping if available, otherwise use the original title
    const displayTitle = category.title;
    
    return (
      <div key={index} className={styles.column}>
        <h3 className={styles.columnTitle}>{displayTitle}</h3>
        <ul className={styles.links}>
          {category.items.map(renderLink)}
        </ul>
      </div>
    );
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo and Social Media Section */}
        <div className={styles.leftSection}>
          <img 
            src={useBaseUrl('img/redstone-logo-full.svg')} 
            alt="RedStone Logo" 
            className={styles.logo} 
          />
          
          <div className={styles.socialLinks}>
            <Link href="https://t.me/redstonefinance" className={styles.socialIcon}>
              <div className={styles.telegramIcon}></div>
            </Link>
            <Link href="https://twitter.com/redstone_defi" className={styles.socialIcon}>
              <div className={styles.twitterIcon}></div>
            </Link>
            <Link href="https://discord.gg/PVxBZKFr46" className={styles.socialIcon}>
              <div className={styles.discordIcon}></div>
            </Link>
            <Link href="https://github.com/redstone-finance" className={styles.socialIcon}>
              <div className={styles.githubIcon}></div>
            </Link>
          </div>
          
          <div className={styles.tagline}>
            <p>Secure. Flexible. Efficient.</p>
            <p>The fastest-growing oracle for DeFi and Institutions.</p>
          </div>
        </div>
        
        {/* Links Section - Dynamically render all categories from config */}
        <div className={styles.linksSection}>
          {links.map(renderLinkCategory)}
        </div>
      </div>
      
      {/* Horizontal Divider */}
      <div className={styles.divider}></div>
      
      {/* Copyright and Legal Links */}
      <div className={styles.bottom}>
        <div className={styles.copyright}>
          {copyright ? (
            <div dangerouslySetInnerHTML={{ __html: copyright }} />
          ) : (
            `${new Date().getFullYear()} All Rights Reserved`
          )}
        </div>
        
        <div className={styles.legalLinks}>
          <Link href="https://redstone.finance/mica" className={styles.legalLink}>
            MICA
          </Link>
          <Link href="https://cdn.prod.website-files.com/67519197ce9eaef4601a6287/67b3785c16aa0cddb7336810_RedStone%20-%20Privacy%20Policy.pdf" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <Link href="https://redstone.finance/terms-of-use" className={styles.legalLink}>
            Terms of use
          </Link>
        </div>
      </div>
    </footer>
  );
}