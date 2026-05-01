import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { vi } from "vitest";
import FavoriteButton from "../FavoriteButton";

const mockPost = vi.spyOn(axios, "post");
const mockDelete = vi.spyOn(axios, "delete");

describe("FavoriteButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPost.mockResolvedValue({ status: 200 });
    mockDelete.mockResolvedValue({ status: 200 });
  });

  it("renders with initial state as not favorited", () => {
    render(<FavoriteButton postId={1} initialIsFavorited={false} />);
    expect(
      screen.getByRole("button", { name: /В избранное/ }),
    ).toBeInTheDocument();
  });

  it("renders with initial state as favorited", () => {
    render(<FavoriteButton postId={1} initialIsFavorited={true} />);
    expect(
      screen.getByRole("button", { name: /Убрать из избранного/ }),
    ).toBeInTheDocument();
  });

  it("calls POST API when adding to favorites", async () => {
    const user = userEvent.setup();

    render(<FavoriteButton postId={1} initialIsFavorited={false} />);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/api/favorites/1");
    });
  });

  it("calls DELETE API when removing from favorites", async () => {
    const user = userEvent.setup();

    render(<FavoriteButton postId={1} initialIsFavorited={true} />);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("/api/favorites/1");
    });
  });

  it("updates button text after adding to favorites", async () => {
    const user = userEvent.setup();

    render(<FavoriteButton postId={1} initialIsFavorited={false} />);

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Убрать из избранного/ }),
      ).toBeInTheDocument();
    });
  });

  it("disables button while loading", async () => {
    let resolvePromise: () => void;
    const promise = new Promise<void>((resolve) => {
      resolvePromise = resolve;
    });
    mockPost.mockReturnValue(promise);
    const user = userEvent.setup();

    render(<FavoriteButton postId={1} initialIsFavorited={false} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(button).toBeDisabled();

    resolvePromise!();
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it("has correct title attribute when not favorited", () => {
    render(<FavoriteButton postId={1} initialIsFavorited={false} />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Добавить в избранное",
    );
  });

  it("has correct title attribute when favorited", () => {
    render(<FavoriteButton postId={1} initialIsFavorited={true} />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Убрать из избранного",
    );
  });
});