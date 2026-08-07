import { TextField, TextAreaField } from "@/components/admin/Field";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SaveButton } from "@/components/admin/SaveButton";

type Event = {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: Date;
  description?: string | null;
  ticketUrl?: string | null;
  posterUrl?: string | null;
};

function toDateInputValue(date?: Date) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function EventForm({
  action,
  event,
}: {
  action: (formData: FormData) => void;
  event?: Event;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-6 rounded-3xl glass p-8">
      {event && <input type="hidden" name="id" value={event.id} />}
      <ImageUpload name="posterUrl" defaultValue={event?.posterUrl} label="Poster (optional)" />
      <TextField label="Event Title" name="title" defaultValue={event?.title} required />
      <div className="grid gap-6 sm:grid-cols-3">
        <TextField label="Venue" name="venue" defaultValue={event?.venue} required />
        <TextField label="City" name="city" defaultValue={event?.city} required />
        <TextField label="Date" name="date" type="date" defaultValue={toDateInputValue(event?.date)} required />
      </div>
      <TextAreaField label="Description (optional)" name="description" defaultValue={event?.description || ""} rows={3} />
      <TextField label="Ticket URL (optional)" name="ticketUrl" defaultValue={event?.ticketUrl || ""} />
      <SaveButton label={event ? "Update Event" : "Add Event"} />
    </form>
  );
}
