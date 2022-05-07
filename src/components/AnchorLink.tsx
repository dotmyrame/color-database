import React from "react";

type AnchorLinkProps = {
  anchor: string;
  ariaLabel?: string;
  children: React.ReactNode;
}

export function AnchorLink(props: AnchorLinkProps) {
  const handleTransition = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    let atr = event.currentTarget.getAttribute('href');
    if (atr) {
      let e = document.querySelector(atr);
      if (e) {
        e.scrollIntoView({
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <a href={props.anchor} aria-label={props.ariaLabel || undefined} onClick={handleTransition}>
      {props.children}
    </a>
  )
}