import { Post } from "@/shared/types/posts";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostCard from "../PostCard";

const mockPost: Post = {
  id: 1,
  title: "Test Post Title",
  body: "This is the body of the test post",
  subjectId: 2,
  userId: 3,
  visible: true,
  isPrivate: false,
  createdAt: "2024-01-15T10:30:00Z",
  attachments: [
    { id: 1, url: "/uploads/test1.jpg", postId: 1 },
    { id: 2, url: "/uploads/test2.jpg", postId: 1 },
  ],
};

describe("PostCard", () => {
  it("renders post title", () => {
    render(<PostCard post={mockPost} universityId={1} subjectId={2} />);
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders post body preview", () => {
    render(<PostCard post={mockPost} universityId={1} subjectId={2} />);
    expect(
      screen.getByText("This is the body of the test post"),
    ).toBeInTheDocument();
  });

  it("renders university and subject names when provided", () => {
    render(
      <PostCard
        post={mockPost}
        universityId={1}
        subjectId={2}
        universityName="Test University"
        subjectName="Test Subject"
      />,
    );
    expect(
      screen.getByText("Test University · Test Subject"),
    ).toBeInTheDocument();
  });

  it("does not render university/subject when not provided", () => {
    render(<PostCard post={mockPost} universityId={1} subjectId={2} />);
    expect(screen.queryByText(/·/)).not.toBeInTheDocument();
  });

  it("renders date in Russian locale", () => {
    render(<PostCard post={mockPost} universityId={1} subjectId={2} />);
    expect(screen.getByText("15.01.2024")).toBeInTheDocument();
  });

  it("renders link to post detail", () => {
    render(<PostCard post={mockPost} universityId={1} subjectId={2} />);
    const link = screen.getByRole("link", { name: /Открыть/ });
    expect(link).toHaveAttribute("href", "/universities/1/subjects/2/posts/1");
  });

  it("shows attachment count badge when multiple attachments", () => {
    render(<PostCard post={mockPost} universityId={1} subjectId={2} />);
    expect(screen.getByText("+1 файлов")).toBeInTheDocument();
  });

  it("does not show attachment count badge when single attachment", () => {
    const singleAttachmentPost = {
      ...mockPost,
      attachments: [mockPost.attachments[0]],
    };
    render(
      <PostCard post={singleAttachmentPost} universityId={1} subjectId={2} />,
    );
    expect(screen.queryByText(/файлов/)).not.toBeInTheDocument();
  });

  it("does not render image section when no attachments", () => {
    const noAttachmentPost = { ...mockPost, attachments: [] };
    render(<PostCard post={noAttachmentPost} universityId={1} subjectId={2} />);
    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });

  it("uses the first image as preview when a document comes first", () => {
    const mixedAttachmentPost = {
      ...mockPost,
      attachments: [
        { id: 1, url: "/uploads/file.pdf", postId: 1 },
        { id: 2, url: "/uploads/test2.jpg", postId: 1 },
      ],
    };

    render(
      <PostCard post={mixedAttachmentPost} universityId={1} subjectId={2} />,
    );

    expect(screen.getByRole("img").getAttribute("src")).toContain(
      "/uploads/test2.jpg",
    );
  });
});
