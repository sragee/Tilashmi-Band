import { PageHeader } from "@/components/admin/PageHeader";
import { TextField, SelectField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { getGallery } from "@/lib/data";
import { createGalleryImage, deleteGalleryImage } from "@/lib/actions/gallery";

const categoryOptions = [
  { value: "concerts", label: "Concerts" },
  { value: "rehearsals", label: "Rehearsals" },
  { value: "bts", label: "Behind the Scenes" },
  { value: "studio", label: "Studio Sessions" },
];

export default async function AdminGalleryPage() {
  const images = await getGallery();

  return (
    <div className="space-y-10">
      <div>
        <PageHeader title="Gallery" description="Upload unlimited photos across categories." />
        <form action={createGalleryImage} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
          <ImageUpload name="imageUrl" label="Photo" />
          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField label="Category" name="category" options={categoryOptions} defaultValue="concerts" />
            <TextField label="Order" name="order" type="number" defaultValue={images.length + 1} />
          </div>
          <TextField label="Caption (optional)" name="caption" />
          <SaveButton label="Add to Gallery" />
        </form>
      </div>

      <div>
        <p className="text-sm text-black/65 font-medium mb-4">{images.length} image(s)</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group overflow-hidden rounded-xl bg-surface-2 aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.imageUrl} alt={img.caption || ""} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3 text-center">
                <span className="text-[10px] uppercase tracking-widest text-black/50">{img.category}</span>
                <form action={deleteGalleryImage}>
                  <input type="hidden" name="id" value={img.id} />
                  <DeleteButton confirmText="Remove this image?" />
                </form>
              </div>
            </div>
          ))}
        </div>
        {images.length === 0 && <p className="text-muted text-sm">No images uploaded yet.</p>}
      </div>
    </div>
  );
}
