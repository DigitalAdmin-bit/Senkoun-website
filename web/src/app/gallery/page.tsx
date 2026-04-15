import {getGalleryImages} from "@/lib/apis/gallery";
import SectionHeader from "@/components/common/section-header";
import GalleryGrid from "@/components/gallery/gallery-grid";
import {getStrapiMediaUrl} from "@/lib/utils";


export default async function Gallery() {
    const data = await getGalleryImages();
    const images = data.map((image) => ({
        ...image,
        url: getStrapiMediaUrl(image.url),
    }));

    return <section className="main-container my-30 space-y-12">
        <SectionHeader
            title={"Gallery"}
            subtitle="OUR GALLERY"
            description="Explore our gallery to see the beauty and craftsmanship of our homes. Each image captures the essence of our commitment to quality and design, showcasing the unique features and stunning aesthetics that define our properties."
        />

        <GalleryGrid images={images}/>
    </section>
}