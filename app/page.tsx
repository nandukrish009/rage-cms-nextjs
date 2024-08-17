import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div>
    <div className={`${styles.home} container`}>
      <img src="/assets/rage_logo.svg" alt="ADK Rage logo" className={styles.logo} />
      <h2>CMS RECOMMENDATION TOOL</h2>
      <h2 className={styles.desc}>Make an informed decision and <span>choose the best CMS</span> that suits your requirements.</h2>
      <p>Answer the 3mins questionnaire and get a report with a CMS recommendation for your organisation.</p>
      <Link href="/questionnaire" className={styles.btn}>Get Started</Link>
    </div>

    <div className={styles.home_grid}>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/magento.png" alt="magento"/></div>
        <div className={styles.grid_boxes}> <img src="/assets/sideview_images/contentful.png" alt="contentful"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/kentico.png" alt="kentico"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/prestashop.png" alt="prestashop"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/wordpress.png" alt="wordpress"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/shopify.png" alt="shopify"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/sitecore.png" alt="sitecore"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/mognolia.png" alt="mognolia"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/hubspot.png" alt="hubspot"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/crownpeak.png" alt="crownpeak"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/bigcommerce.png" alt="bigcommerce"/></div>
        <div className={styles.grid_boxes}><img src="/assets/sideview_images/drupal.png" alt="drupal"/></div>
      </div>
    </div>
  )
}
