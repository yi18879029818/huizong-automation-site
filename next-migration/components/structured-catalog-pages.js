import Link from "next/link";
import { PublicPageChrome } from "@/components/public-shell";

const PRODUCT_CARD_IMAGES = {
  "agv-forklift":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDH8-rohoCgyosxNpROe4c3L_Raj015wRaQKAR3eTQeBC8IA-eL5EYWCnOl8LPVEru5j4ZkuU9gs2Juz3RZuqOiFMDMo_tMag21bEF_mpRR7txQ0xFLD_dZ3st0NRTgNuVFK7Vqn_KW_PnffL13SX2EpdxGLXD2AtiObJN0-EyMlAKrGInbpBQEAJXGFiS-vNwoX0vT8OXvhxXyUe7UAWdjS0FrE9KMaowkRfUPZ87DDWA9swW9z67PxANEdtYirGYmiRUjTr7ntrQC",
  "lifting-agv":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCbzssVmTr7T4eersFFRGJJdzlNYjyOnuMf0BUlLcI0KAM978KUKk1nQ2rd5z_GkJpe9ulPJUK6wOQ8W1V1zCbeScP-wVGdP7aPcmY-uXG2bM4VKL4VCZCSmilu7xazhtTRnwHL708_8NiYqxr4PNmHNFGmSYKY-BpVSz2vIXwYPU7pt8AHak4mq489CIEZDbyAyEN00s8chy-aVjQDcohisVwi9mrNVRysOepXUNpbtD8_CgpCcWN8wMRMxWIVEXnpWH1SRWDRrXPX",
  "storage-agv":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAqyNqEMsxYO_Til72YoFZnX11faZE9gxG4bpGUYnFf0uKSqHzdTJeDEyWY2V01h7GvZbGVJCbiX0UKUXDGff62kzYwo0hQnz4a-HQ65L9RksKPAoqToGAw1GWYmWopU73gFj8OVat36_-f0QN_sEefMoffvQWjUFBpHSKrwSAH996Ntqyn5wz045HtSE_npV2vaLg8UGzvmZYkrTwYtPCUxflJsMVD6R-qMlwopM1N7yuYTkruf1CojYon0ivqsIQeykCHkhQBrZLJ",
  "agv-roller":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDhqmenpXYjngrVGvavRuD-FWb18G0auUynJaApJh5KCJadHFG7bFHS_mop6016Ho9HEoUheaRJWTFHrVY4y6pu4qTsh8AUXrShxNcnx6TxPhegxlpLJm9TzK3KUL78ArxrIi7JiHaFIZYH2_2D1vAfhFtkIvpP3NFMNEmWjH2Sgf7U5SPFw3sIqBTALmaPX0pyBmgz1xu0IgpGlIx6xE2yDli3jbz8fLhX2BdnZBvo20sasX1cRan0MxFTVPhVRGYmn2JS5UbswbLY",
  "composite-mobile-robot":
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAD2LvGQHucwtFhxK98e5TDgsnaqbTxWJMwAX8Kihy2Iu_s21iN8V4dbY_fgAeRLHRBeqVXE-UKie8l734YS7C3rJa32QXS5WzBo2dAPma5unj9G784c25A-ObSf0Vvh6HBTqeS4jdJiKhkvsZpb59H3--65H7mcnqyHmw1xeN8P7A8doazNtZVvPDCnuXTzCZ6LEEMaF8jDr02TBQqQszDnaTXIT4bjRlCpZdzNnfJZqk_mkeu2R9c_0M-Mla616IFJL3EnlZpahuv"
};

const PRODUCT_DETAIL_VISUALS = {
  "agv-forklift": {
    heroImage: "/products/chacheAGV1.png",
    featureImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVGHLQyPWswkMy-WbK_JVcGyrHGLxBjQHB6BaQgaH5AO6apmCESe8-F4IztySJ_YXtdQjqaM9UtkmWha_-9pLHdAbJJMODpLI4DHKLtgbXJPw6U1CtffR0dVzpxDWQ1og5H4ng8D8nsjLDBpH7z-ev2nnRJpzOnq299vPA2fSp3XdW_2FkcVI4f_HQICK6lpXM8Ywu0d4LpluwrKWyfx7v1EW1Xw7Rxorok-yNdXCsPYi86oOiPdny4QW2DN3pkTUgjFUWjTHf4jnC",
    scenarioImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYFcOkg43a4CILwgiFZ4fupjXTw8wkNj0bSGVp5-fLb4OaIVeIgnuMuR_l6GMWc5u5AyW6hqZaVjz9v35NWeQ0HZY6GGeT3rUa9-74l1Pn2RYdmm4WQyphqYZwZ3qG0GjZq5waCI7nNxyZyvvtJnvcMFGeVPqLPwf6LdW6ahPdLSoYhJrk76OvITC1GocD0bl6iRvfN0MGnCl8xBxNQu8FEsynzMOVhnGj1qB0x0qgiljWmRXY9zFVc5gpKvl8PuV_jW8gX4MgbnEH",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCXVsMNRb6zsAKC01BgIlJzISS8gwYMnu07p0d46DN1n_GSvsoHtZHlZuwQA_8nm_qHRCyoiW8m8Nx8tlV19McZ8u3hyGHM2fSql3pWtiGGdo5Y0lqk38hLjENgaIMPffYcj59xoSNsBMuQpL4jQt-hK4-igEomEKcoDXMsvc-uNr5_hV1gF7haHC6hIjTKhPTLv8ZzfK46S9sPJBlTiF1eHP9zVenpziQsGY5ImCtzmk8LCiZ2M3wj7W7PZAIMPeyPKQp6W0PYzlUl",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDm-2anC4fgMzLdYXzmYB4jDZ575l2fRfFA2ZVGNJoRbRDM15dz0twtuS6eTSJfmxDGxNbSKl_Mx1Kcy6jb7_dOY5zckz0aH-0ZdW0PipiCLd681Ml6Daqv_T6-t-0Z8KsA0PLGA4_2h4YMyf1Pygs7el8fu4U1tZeZky5FmF2vXDK5nkm2k3BjqLv25D5rELB6Bml8e_L3c3X_DNE5neVpc_geVVD-5x6JzQBv67pGMQpE9Lln_0NlFkFUnlIvWEDiPwlh4IZI5-ab",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKPJPEd_sRXT9-cq133VMLTvKi-kGu-uQHF379phGEeUajG850SCHi5wIdO3hVN465t1rPGu_Akq4UYVeyvx9sq8wz052SxRH2F04v3HVi30PHkJux-p96fxOeEi6FC05Y3iuobaAGr7BCfY0lb7XnbGnN3x99kFkyoprExWKpZwy4djRzOvnoF-DP9C0snCLNHZovoLCN5ZbAqo1EYMwqelyeBlnqk2UZuSMy1n6KwERFqCXrTkSkbQ_CALa22Ztqx82Ym_WPyIDK"
    ],
    integrationImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZgf_hH8mNowqN89L4mUOK0cv5TpQazjrTltjHbbcYWssXo8W9GKMSJqoexgKlvnBipJSYGk0x8bMfV3ZbZ7tlc8pekrIqn8tUwU9b9cNI1NrsuKP8vCmBbcNv2pe0f1S-0oohouKQGa5VNlwllMRjrOGvEKmp25_LdlEdgVactF-WFRncTbm8mBEeObD2hQbA30WijWOKJxze2u0YXMWqwPSPlPNBRfyRzI-2FqCPtD6k9rzl2TB1cx9sf_gbtSwf-YtlpbcwOZ0j"
  },
  default: {
    heroImage: "/products/chacheAGV2.png",
    featureImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVGHLQyPWswkMy-WbK_JVcGyrHGLxBjQHB6BaQgaH5AO6apmCESe8-F4IztySJ_YXtdQjqaM9UtkmWha_-9pLHdAbJJMODpLI4DHKLtgbXJPw6U1CtffR0dVzpxDWQ1og5H4ng8D8nsjLDBpH7z-ev2nnRJpzOnq299vPA2fSp3XdW_2FkcVI4f_HQICK6lpXM8Ywu0d4LpluwrKWyfx7v1EW1Xw7Rxorok-yNdXCsPYi86oOiPdny4QW2DN3pkTUgjFUWjTHf4jnC",
    scenarioImages: [
      PRODUCT_CARD_IMAGES["agv-forklift"],
      PRODUCT_CARD_IMAGES["lifting-agv"],
      PRODUCT_CARD_IMAGES["storage-agv"],
      PRODUCT_CARD_IMAGES["agv-roller"]
    ],
    integrationImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZgf_hH8mNowqN89L4mUOK0cv5TpQazjrTltjHbbcYWssXo8W9GKMSJqoexgKlvnBipJSYGk0x8bMfV3ZbZ7tlc8pekrIqn8tUwU9b9cNI1NrsuKP8vCmBbcNv2pe0f1S-0oohouKQGa5VNlwllMRjrOGvEKmp25_LdlEdgVactF-WFRncTbm8mBEeObD2hQbA30WijWOKJxze2u0YXMWqwPSPlPNBRfyRzI-2FqCPtD6k9rzl2TB1cx9sf_gbtSwf-YtlpbcwOZ0j"
  }
};

const SOLUTION_DETAIL_VISUALS = {
  asrs: {
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvUTmADNAkse026bXP5S2xeU5lrvzzSC-fMhGB56rcdJEnHXjYNm5qy5mrGLSVMk4-kqnRqRJXlTW6FbR1r8Sva8nzI1OCQ6DslTFDtey_fPyyNzAaBQeKHZCSE5ByHU43trBvqdyONGuyeGkGBJ7-gd5Fy__zjwZf1dhKBGXcALzMKSyYafwHZxfM7950Tp2gDW-VQ32i2CxD9KozfkYEUi_mP0N883nL6adLgebT3unCvDGdxqvpZA0pvKy4ZbiCwFGuuodQqDdn",
    scenarioImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeB5vcHvmK3tq-XD-LUsfiISJWmPG2sIIWkyMHx8kIPzu5qbhTb2gR-BawyZAFl4YYS547tVxFUq_RsUye5c_XBkX7vtHujO8PdFXWJDesIoW1SsXjIQ6RRTjx-NLACcLnBkUsHf8Br8IeTqu5brl75QmPcgpcx6T1Oevm-M8Lkb6aSPlHbSvSpctfTapMr_aF62DOcfxjqv4rAZHneGL-5B4ax2y5qXU0knCkhPSzpd3TSIQzPOv2RX3L9TLegSn9kPRvTf7adR73",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4s2IfXAe6PqpN-_U27a1nOX0Krwu7uTm8lqjKBDUlnOmqJv0hs39gsR44iY4ID1ijysMdTIx8OdjIVBYcPc6-kToQctV4y8u2SaUEqFkejeJKLVPENacOsh84-1ljUIAn25rG1C0TLPvptDVN34mHZv1g1u25DZ_j1Aga_4v8LlYU3qwhsSSDrPUdaik1BwmopNFcaVrLjqvQMF1I8dwdg1fwcx6I53yD8aTkZ13UF_5Pq_JWdfxFCafLVL5Q76f00Jcr7q1kdQjd",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEeunkkCstPAV033eSfRvblUp6f63uqesniCIbC7VYtYAzfr36BdU7juzLqOZbmbWQXhbdtoImL4C0N_ZbKWBfQ_ntLvDsqw9f-pWetRKrCXlzJZtWA3cpDIVrXFXLJ-ucAQSeWOvdneg4JaltEwwaiY2nhQy3UTjPgM7caPWe_qXlPZzqhPar1XDwKcp_AGOdZQdQ12hG9sb2-ByTyMxTgLt13Zd202MS9Or8sFr8JMf_7RjzjDeYyG73vXy2GSxJCUE8kmp3kDOc"
    ],
    synergyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjENgwVmt-9umH_oW_6NeCrbqwRoGF2eVJPDmbW0LjCc9E4Pyyevy7-WMp4bZug-3XFptCxE-ilczeHDAqOJ8WTqagMHn_n86kFEU8dIJggTcC3AXJluAmaK9x-WRoP4o21vlMH-YmTgLTUZy3TcubjJK88PU-ple7kX4sBKixM_zvURe7IDahX4rlhHPKIGBsGf6srSHIIRtSRXihj_qIT0Je8n-QCarVml1c_g15ZC13XWb1aW4nEzEcbcc6qiwS5MOluOcQuv65"
  },
  default: {
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDfujFnEmwYtviRkzf7npRhGnksP1WeNEAHg5ttqRcI1VyZfdnGr3kSTvj1_WTJPDLckYdK76sNEyQlRiq-OZ4iiyPpE4NDOlas1RDhxDPy6KT_gc1s6J4gjDWehm7G05nVABrh0e63T6KmOziLVGDB0HX9FiXfSr_KK4wWy-JFPtSCQnxJjEgBwQdFjOPRxhTSekgyBQgiPuamWVZcgLwuTBusuTsiXcJ8agv3e-xaZkuGmJsXNRoPu4GZzx3y-y-SJnqecimEKpif",
    scenarioImages: [
      PRODUCT_CARD_IMAGES["agv-forklift"],
      PRODUCT_CARD_IMAGES["storage-agv"],
      PRODUCT_CARD_IMAGES["composite-mobile-robot"]
    ],
    synergyImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjENgwVmt-9umH_oW_6NeCrbqwRoGF2eVJPDmbW0LjCc9E4Pyyevy7-WMp4bZug-3XFptCxE-ilczeHDAqOJ8WTqagMHn_n86kFEU8dIJggTcC3AXJluAmaK9x-WRoP4o21vlMH-YmTgLTUZy3TcubjJK88PU-ple7kX4sBKixM_zvURe7IDahX4rlhHPKIGBsGf6srSHIIRtSRXihj_qIT0Je8n-QCarVml1c_g15ZC13XWb1aW4nEzEcbcc6qiwS5MOluOcQuv65"
  }
};

const CASE_OVERVIEW_IMAGES = {
  featured:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDj7Hc4AwTQplIg6zTdU9y9fxNkrnj84srnalkiOvSBXKkGO3Wq_lcmeV7YLhrDd553Jl4TvLs8YhJkDU2rI3_Vgt2FCNHg2QPyZ2QCXF-Uar76qCYHcZnT5V-DFNlk9JWQ3-Yeo7EwVpY1WOxTmBT25AzarOvaks04YDvgVX8vY4MpstIluyScvm5cJr_Oyq42B8sI791kP70bp_N3aX5DKMc2s2S9H9mjWOt-ahBK5JiSKz7dnyV8WpTDlGDxviYNICeGU0UwTwgR",
  portrait:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0om9dfYTQaYzXPkjfNgkNumDdcEo2dgdRRHE5NP_F-nGELZsUoTujqtJZr7qbb-mL4jXpyT0XaKyfdnTcJQ_l93ZY21y9qW586KQViXHfcWyvEO6NfWCjFN9bOWdZaecnghrAbVXQZYEi22DX6DfOrZgsyVyqp7Tbcl5R-bK6LiGZs-SXoleMLLiF4ih9zxJcUqW5AqvW-EqMxIhvFXlgW--gJ994Yif6Ath_aGYQeSGDC40fy8E_OBy3i7UzoLCP1Fx2e8jCJYtN",
  cardOne:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4eXCnTHz4df8B4QuL11cQVatRB8I9ClK2mBtjRtYBPSZ9X_9ZK8iNawaZ6xjXbfskKB9HskM90qBzBbUvBpPNTodVbH-HlDs8_n9Nd5B5xa8DZngc8qfNBOTCoaADD3BbLrkKvQevwpwSVUyt9MWU8HafbvJ0HoVRyWnqHZ78MGR9K2UMZWUWXKIUYnZXF61Z9OQuwQV5EXoysvARbPd5SUmP6bZ-41LSdPTipCxQdXBP2jpwvimvmxmMBtZCp94qdU25TiLreULf",
  cardTwo:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuApVyVpSj2dNGanpU5KSO1fpMZPRsk5T4ykgQJdu77YWtdDtzH_yY97tP3VGMv2roZDrdjM-se6643oH2QrVPxzRKkIKsc-RVNfgnLZ4YZ9dsO2M_tVojZHjeyO8mnhTjD2aZvCLoGq_XFo3drTBnctODTvjIDsFJA7-lsHHrGCa3AfhcFARP5pAf4buHfUaUvlo03J20_MQqILMAbcuhb1asGXUbfR_lYFazUb2eC1HL51WaEUMa4vqzK9nrMiVcHKvV_bbY4srZFK",
  bottomWide:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCAFF34JqGDWnx25Wh9XVDaL1c-2D1YNMr75RIBNcUmJZ_Mfp9Tu6Z4GUpTIR8eT76HYI_9_EqsvNQi5YRx4F9dqScrfqPrd4C0mFVdrT4xsZ9O0tglj8EBby0U72iiFyCq_tWyanuqTS4jCcWsUhEsMiynmONdMHNbzXaEsE7ZAkIaSQtyEN30X7OmTf6BqVNcjnOyfmS4B1-tc32NFUgbQRLPZL9jt1pFW_6dZH1Qp-NUsww1-99xuMTGhhJbqsUOjJl7BfyE4c-S"
};

const CASE_CATEGORY_VISUALS = {
  asrs: {
    hero:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDaYfi_VgscfniX2CtLQhMwU73LU12yVp3_l0b1mLjBUgamZfSbPhIwKxQcgfXyqwNpb5it7Pj9OT-q1pCMHtbi-5-xnGZ42xkCxRhYSJmpFFeTtiMVtaC3HrHyuojv6HjazK4teSg8RH0Lk95YyxEMmli1l1L2AOvRWtAf2R6kIW6itG8IP60WRIUQTcmpgd6YmWvG7RsHa798tc3cXRl-lSLQcAzkVdv8rjhu2uyumX0aMlLgDPO5gveyt0hrcy2tGy-oiJU8HpIi",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAEUrvdV_J9CE_mEdAJ-zPEWvgvU7ucow2SKQlP_FBq0JUf2rB--ZkIoysa5r9CWAFjRIh59ENwIm9gzo8RUQHE5aejuznq_byy2jRYDYhky2iKRHaNeGiqN9Ljk6W9h1Y2t2B3hVpjIrxkrfH8gulGtP6SLJcrIvkrwzQPFkUaugaiW-Ur-jG-NcYmvx86wOcFongZm3UtWfiy1EpO-WiiXhv0KKfp4zHXWuBtVf3nj4dlAJNTAuF2tZROMMwgtCRFoA3S-_6XdUxx",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBFrDpt7efCnOuqdZrytQ-6RIJfyMzg0rGl9a5HrBxmEqpJknLz8o6JHG4Tw16DXfMlDIb2o7lERIYFH9kokQ5UxpQI5zu2rUxBIYUVDGgoKWCniyGzEB2a5vXnOrnrSVre4jpfjgsX7ZpudtoNvnt0QXpjt9mzps3mCu0ayF0R0MmTtZslp1RnOQ__9-E5z96ucF29H-X7xcFpgOAiMXPuRgVBUlUk-cpOXxGnR6UhSQKGWrbfMOnfB84TXkK4VKzRqyM2iM5uYLOG",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQRamGtF435kH_KRyC_TyYLjQ4WzQJjQVjKiN29PIOyviPmxHc1Hy3LklAcLEZNzeBTHKRlGCPNB0KH3ZHJASfjDQGMM3150xn7cwxds0lLjJZ1SVatZzxWXCnZj5X9efLRPv7FDSaLlWHZe3I6iDW-4Rp9XAXAdHKOzw8h9pB8HyfSN0P3JrKvjkCPiwHuKL6GFBijdL-5ZP8y90_nwq-bWVlHiUbw1T2GEm4bRW7R_FRIfXnl9D5AexNOQ6SOaUpFycIC6COyySQ"
    ]
  },
  default: {
    hero: CASE_OVERVIEW_IMAGES.featured,
    images: [
      CASE_OVERVIEW_IMAGES.featured,
      CASE_OVERVIEW_IMAGES.portrait,
      CASE_OVERVIEW_IMAGES.bottomWide
    ]
  }
};

const CASE_PROJECT_VISUALS = {
  hero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCuRjM3MGqXNmzcc3iOV9z2vyjZyfEMNRN76U-u2d9EJib1Sp3ekWtb-OyhLcrMCKog6TtGqqCS1ITSTJSNEk23e40_OILuD94eSrGynUgWb6tmNyb4wvJhS7rCQOqD49IUjvwEGGCbJos7eRg3tgTt49hIlbTtEPejscO-kCPDIiMRQo8x9uWPT2-lrTiGf2YFG5cuFhFUvulG-J2Ud7y6DIM9BW2wpI_7Iq3JoE3UxsHiUBa8_GSzXRDGnIUFTB8deT76xjAa91Xd",
  solution:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuATWPS6-sfbuOUei8HrjhdrHYuIY_UdpvqZHSFLyFBdRjsNe007OXMzMq5hJ3A9p7mWZqiJiu21-lQaXxGkHipJBjVv1hCdP2EhHeawYPGmOTtpxFqNqbHw-nx8H9GXBvu9AjIFQ1Hj3ck7zKoL0WFlyhbq2zAwlZsUdoRBp4L_160hru22OeMHuhDCzvDZVz8GA6bPWetm97u1NOa_qKGs8dtMlR6S_Z-7fpxBvA95rtThP-MmUbr6PgReWkZAeEa627saLidUageB",
  related: [
    {
      title: "ASRS Systems",
      description:
        "High-density vertical storage for zero-error retrieval in temperature-controlled environments.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDLrtbKA9TTD_gXDPRsny7HT_XJwa3oSJ4TrL63W8XTw5cXlOleCMK3EKDJ4_p9J4BcddGb7G6oESokg26a7rz5sJSIRihFOLw6QVm2cdER4MUar1isWakauQ5CYYHfZbs6TSjawgMhNVN-yi0HOgQgtB1XRbNpylFbsE2NprTOSC7fs5O5KlywKOGsgsX_uq3LLPTuci0dwwbvq_b35nuf_XLrsf1amsCBf80N3yTTofQByhiKpOICad-uxRLaYoY3XqFMZ6iiT96D",
      href: "/solutions/asrs"
    },
    {
      title: "Intelligent Picking",
      description:
        "Voice, light, and vision-guided picking systems designed for extreme speed and precision.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZgf_hH8mNowqN89L4mUOK0cv5TpQazjrTltjHbbcYWssXo8W9GKMSJqoexgKlvnBipJSYGk0x8bMfV3ZbZ7tlc8pekrIqn8tUwU9b9cNI1NrsuKP8vCmBbcNv2pe0f1S-0oohouKQGa5VNlwllMRjrOGvEKmp25_LdlEdgVactF-WFRncTbm8mBEeObD2hQbA30WijWOKJxze2u0YXMWqwPSPlPNBRfyRzI-2FqCPtD6k9rzl2TB1cx9sf_gbtSwf-YtlpbcwOZ0j",
      href: "/solutions/picking"
    }
  ]
};

function getSlug(page) {
  const parts = page.currentHref.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function getMetricValue(metrics = [], index, fallback) {
  return metrics[index]?.value || fallback;
}

function getMetricLabel(metrics = [], index, fallback) {
  return metrics[index]?.label || fallback;
}

function productCardHref(card) {
  return card.href || `/products/${card.slug}`;
}

function sectionIntro(kicker, title, summary) {
  return (
    <>
      <span className="inline-block text-secondary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 border-l-2 border-secondary pl-4">
        {kicker}
      </span>
      <h1 className="font-headline text-6xl md:text-9xl font-extrabold leading-[0.9] tracking-tighter mb-8 text-kern-tight">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-on-primary-container font-light max-w-2xl mb-12 leading-relaxed opacity-80">
        {summary}
      </p>
    </>
  );
}

function ProductOverviewBody({ page }) {
  const cards = page.data.cards || [];
  const [featured, ...rest] = cards;

  return (
    <main>
      <section className="relative min-h-[700px] flex items-center overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 opacity-40">
          <img
            alt="Industrial warehouse automation"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLagVSRLu1zDAJon6yyB7H4GgeX1TFbkOWS9x2YX3-2T78u7aRFZQ6OHKpc9LszOlSnuMnkvP1uDtsffEqJFqhIWXOtv-wg0jcO9ktF5veA62qibkGGHsqRjuH5Z_bvcJ1z3vDEUPOoaTYjZdaZLEIJX8nlPpwD1jJFlYys_3zpaUZeHsHhIR52fiCwClytae1cZDtqsalNnSOrgJ63eEzW--Zg5wNxHDbR6flEO5ABz3d7bLJUPKzEgsDp4_OmXpvRxd8sOvxhD6b"
          />
        </div>
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10 w-full">
          <div className="max-w-4xl">
            {sectionIntro(page.data.kicker, "Warehouse Automation", page.data.summary)}
            <div className="flex flex-wrap items-center gap-10">
              <Link
                className="bg-secondary text-white px-10 py-4 font-bold uppercase tracking-[0.2em] text-[10px] shadow-lg hover:bg-white hover:text-primary transition-all"
                href="/contact"
              >
                Consult an Expert
              </Link>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="h-[1px] w-12 bg-outline-variant group-hover:w-16 transition-all duration-300" />
                <span className="text-on-primary-container text-[10px] font-bold uppercase tracking-[0.2em]">
                  Explore Systems
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface industrial-grid">
        <div>
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <h2 className="font-headline text-4xl md:text-5xl font-black text-primary mb-6 tracking-tighter uppercase italic">
                Autonomous Fleet
              </h2>
              <p className="text-on-surface-variant text-sm font-medium leading-relaxed border-l-4 border-secondary pl-6 uppercase tracking-wider">
                Our AGV and AMR systems represent the pinnacle of material handling engineering, designed to operate in dense environments with surgical precision.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-8xl font-black text-surface-variant/40 leading-none select-none tracking-tighter">
                01 - 05
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-1">
            {featured ? (
              <Link
                className="md:col-span-8 group bg-white border border-surface-variant relative overflow-hidden"
                href={productCardHref(featured)}
              >
                <div className="aspect-[16/9] overflow-hidden bg-surface-dim">
                  <img
                    alt={featured.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    src={PRODUCT_CARD_IMAGES[featured.slug]}
                  />
                </div>
                <div className="p-10 flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="max-w-xl">
                    <span className="inline-block bg-primary text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em] mb-4">
                      {featured.label}
                    </span>
                    <h3 className="font-headline text-3xl font-extrabold text-primary mb-3 uppercase tracking-tight">
                      {featured.title}
                    </h3>
                    <p className="text-on-surface-variant mb-6 text-[10px] uppercase tracking-[0.1em] font-medium leading-loose">
                      {featured.summary}
                    </p>
                    <span className="inline-flex items-center gap-2 text-secondary font-black text-[10px] uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">
                      Full Specs <span className="material-symbols-outlined text-sm">trending_flat</span>
                    </span>
                  </div>
                  <div className="w-14 h-14 border border-surface-variant flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary transition-all">
                    <span className="material-symbols-outlined text-primary group-hover:text-white">
                      north_east
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
            {rest.map((card, index) => {
              const accent = card.slug === "composite-mobile-robot";
              return (
                <Link
                  className={`md:col-span-4 group border border-surface-variant ${
                    accent ? "bg-primary text-white relative overflow-hidden" : "bg-white"
                  }`}
                  href={productCardHref(card)}
                  key={card.slug}
                >
                  <div className={`aspect-square overflow-hidden ${accent ? "" : "bg-surface-dim"}`}>
                    <img
                      alt={card.title}
                      className={`w-full h-full object-cover transition-all duration-1000 ${
                        accent
                          ? "opacity-60 group-hover:opacity-100"
                          : "grayscale group-hover:grayscale-0"
                      }`}
                      src={PRODUCT_CARD_IMAGES[card.slug]}
                    />
                  </div>
                  <div className="p-8">
                    <h3
                      className={`font-headline text-xl font-extrabold mb-3 uppercase tracking-tight ${
                        accent ? "" : "text-primary"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`text-[10px] uppercase tracking-[0.1em] leading-relaxed mb-6 font-medium ${
                        accent ? "text-on-primary-container opacity-70" : "text-on-surface-variant"
                      }`}
                    >
                      {card.summary}
                    </p>
                    {accent ? (
                      <div className="flex items-center space-x-2 text-secondary">
                        <span className="font-black text-[9px] uppercase tracking-[0.3em]">
                          Next-Gen Tech
                        </span>
                        <span className="material-symbols-outlined text-sm">bolt</span>
                      </div>
                    ) : index === 2 ? (
                      <span className="inline-flex items-center text-primary font-bold text-[8px] uppercase tracking-[0.3em] bg-surface-container px-2 py-1">
                        ASRS Modular
                      </span>
                    ) : (
                      <span className="inline-block border-b-2 border-secondary text-secondary font-black text-[9px] uppercase tracking-[0.3em] py-1">
                        {index === 0 ? "View Technical Data" : "Link Systems"}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-white border-y border-surface-variant">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {(page.data.capabilities || []).map((item, index) => {
              const icons = [
                "architecture",
                "dynamic_form",
                "precision_manufacturing",
                "verified_user"
              ];
              return (
                <div className="group" key={item}>
                  <div className="w-10 h-10 flex items-center justify-center bg-surface-container mb-6">
                    <span
                      className="material-symbols-outlined text-secondary text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {icons[index] || "hub"}
                    </span>
                  </div>
                  <h4 className="font-headline font-bold text-sm text-primary uppercase tracking-tight mb-4">
                    {item.split(" ").slice(0, 2).join(" ")}
                  </h4>
                  <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.15em] leading-loose">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-surface overflow-hidden">
        <div>
          <div className="bg-primary p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute inset-0 opacity-5 pointer-events-none industrial-grid" />
            <div className="absolute -right-24 -bottom-24 opacity-10 rotate-12">
              <span
                className="material-symbols-outlined text-[400px]"
                style={{ fontVariationSettings: "'wght' 100" }}
              >
                settings_input_component
              </span>
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-black text-white mb-8 max-w-4xl leading-[1.1] tracking-tighter uppercase italic text-kern-tight">
              Ready to optimize your fleet?
              <br />
              Consult our architects.
            </h2>
            <p className="text-on-primary-container text-lg mb-12 max-w-2xl font-light opacity-80">
              Join the ranks of global logistics leaders using Huizong Intelligent Automation to redefine operational efficiency.
            </p>
            <Link
              className="bg-secondary text-white px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-white hover:text-primary shadow-2xl"
              href="/contact"
            >
              Start Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductDetailBody({ page }) {
  const slug = getSlug(page);
  if (slug === "lifting-agv") {
    return <LiftingAgvBody page={page} />;
  }
  if (slug === "storage-agv") {
    return <StorageAgvBody />;
  }
  if (slug === "agv-roller") {
    return <AgvRollerBody />;
  }
  if (slug === "composite-mobile-robot") {
    return <CompositeMobileRobotBody />;
  }
  const visuals = PRODUCT_DETAIL_VISUALS[slug] || PRODUCT_DETAIL_VISUALS.default;
  const features = page.data.features || [];
  const scenarios = page.data.scenarios || [];
  const integrations = page.data.integrations || [];
  const statCards = [
    getMetricValue(page.data.metrics, 0, "+/- 5 mm"),
    "360 deg",
    "L5"
  ];
  const statLabels = [
    getMetricLabel(page.data.metrics, 0, "Stop Accuracy"),
    "Obstacle Detection",
    "Autonomy Level"
  ];

  return (
    <main>
      <section className="relative min-h-[720px] flex items-center overflow-hidden kinetic-gradient">
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img
            alt="Warehouse environment"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDztEsOiohIzS3uZT5jZv_eW-vOJH0jI11qAX2nx8lFrTiYIhuljsB0j3VOzEl6w2ILYs3td4-2Dh0s38HPd_3-oO-Zg30C25w7VyqfkPr9br9f1Nnp0RaSC6Eb8JX1rt2aY1V_BFDJekWqtqruUlguA-5m3azKSFu26a0D61ziK_7pY619knYl-V7FKL1Z0HzKvd1Dn4tkboyKAl0egzcRgJ9_TP1Ajp5U8_cynS-v-ScVpL8GbgahHSQov2PgoPZdPV51OIivRi7e"
          />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div className="space-y-8 py-20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-secondary" />
              <span className="text-secondary text-[10px] font-black uppercase tracking-[0.4em]">
                {page.data.kicker}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[0.95] tracking-tighter uppercase italic">
              {page.data.heroTitle || page.data.title}
            </h1>
            <p className="text-on-primary-container/80 text-lg md:text-xl max-w-xl leading-relaxed font-body">
              {page.data.heroSummary || page.data.summary}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                className="bg-secondary text-white px-10 py-4 rounded-sm font-bold text-xs tracking-[0.2em] uppercase hover:bg-secondary-container transition-all"
                href="/contact"
              >
                View Specifications
              </Link>
              <button className="border border-white/20 text-white px-10 py-4 rounded-sm font-bold text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
                Download Brochure
              </button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-20 bg-secondary/10 blur-[150px] rounded-full" />
            <img
              alt={page.data.title}
              className="relative z-10 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)]"
              src={visuals.heroImage}
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-3">
              Precision Engineering
            </h2>
            <h3 className="text-5xl md:text-6xl font-black text-primary tracking-tighter uppercase leading-none italic">
              Performance
              <br />
              Redefined.
            </h3>
          </div>
          <p className="text-on-surface-variant max-w-md text-lg">
            Every component is stress-tested for 24/7 reliability in demanding high-throughput environments.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white p-10 md:p-14 border border-outline-variant/30 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div>
              <div className="w-12 h-12 bg-primary flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-white">navigation</span>
              </div>
              <h4 className="text-3xl font-black text-primary mb-6 uppercase tracking-tight">
                {features[0]?.title || "Autonomous Navigation"}
              </h4>
              <p className="text-on-surface-variant text-lg max-w-2xl mb-12 font-body leading-relaxed">
                {features[0]?.description || page.data.summary}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-outline-variant/30">
              {statCards.map((value, index) => (
                <div key={`${value}-${statLabels[index]}`}>
                  <div className="text-3xl font-black text-primary tracking-tighter">{value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-outline mt-1">
                    {statLabels[index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {features.slice(1, 3).map((feature, index) => (
            <div
              className={`md:col-span-4 p-12 flex flex-col justify-center relative overflow-hidden ${
                index === 0
                  ? "bg-primary text-white"
                  : "bg-surface-container-low border border-outline-variant/30"
              }`}
              key={feature.title}
            >
              {index === 0 ? (
                <div className="absolute bottom-0 right-0 opacity-10">
                  <span className="material-symbols-outlined text-[10rem]">bolt</span>
                </div>
              ) : null}
              <div
                className={`w-12 h-12 flex items-center justify-center mb-8 ${
                  index === 0 ? "bg-secondary" : "bg-primary/10"
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${index === 0 ? "text-white" : "text-primary"}`}>
                  {index === 0 ? "battery_charging_full" : "precision_manufacturing"}
                </span>
              </div>
              <h4 className={`text-2xl font-black mb-4 uppercase tracking-tight ${index === 0 ? "" : "text-primary"}`}>
                {feature.title}
              </h4>
              <p className={`${index === 0 ? "text-on-primary-container" : "text-on-surface-variant"} text-sm leading-relaxed font-body`}>
                {feature.description}
              </p>
            </div>
          ))}
          <div className="md:col-span-8 overflow-hidden relative group h-96">
            <img
              alt="Forklift sensor detail"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              src={visuals.featureImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent p-12 flex flex-col justify-end">
              <h4 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">
                {features[3]?.title || "Multi-Sensor Fusion"}
              </h4>
              <p className="text-on-primary-container/80 max-w-md text-sm font-body leading-relaxed italic">
                {features[3]?.description || "Integrated safety systems for zero-incident operation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-32 border-y border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-4">
                Versatile Deployment
              </h2>
              <h3 className="text-5xl font-black text-white tracking-tighter mb-10 leading-none uppercase italic">
                Designed for
                <br />
                every flow.
              </h3>
              <p className="text-on-primary-container text-lg mb-12 font-body leading-relaxed">
                From the receiving dock to the final dispatch line, these systems adapt to your specific workflow requirements.
              </p>
              <div className="space-y-3">
                {scenarios.map((scenario, index) => (
                  <div
                    className={`flex items-center gap-4 p-5 bg-white/5 border-l-4 transition-all ${
                      index === 0
                        ? "border-secondary"
                        : "border-transparent hover:border-white/20 cursor-pointer"
                    }`}
                    key={scenario}
                  >
                    <span
                      className={`material-symbols-outlined ${
                        index === 0 ? "text-secondary" : "text-white/30"
                      }`}
                    >
                      check_circle
                    </span>
                    <span
                      className={`font-bold text-xs tracking-widest uppercase ${
                        index === 0 ? "text-white" : "text-white/50"
                      }`}
                    >
                      {scenario}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {scenarios.map((scenario, index) => (
                  <div className="space-y-6 group" key={`${scenario}-${index}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        alt={scenario}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        src={visuals.scenarioImages[index % visuals.scenarioImages.length]}
                      />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight italic">
                      {scenario}
                    </h4>
                    <p className="text-on-primary-container text-sm font-body leading-relaxed">
                      {features[index]?.description || page.data.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white text-primary overflow-hidden relative">
        <div className="absolute -right-64 top-0 w-full h-full opacity-[0.03] pointer-events-none">
          <span className="material-symbols-outlined text-[60rem]">hub</span>
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
          <div className="max-w-3xl mb-20">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary mb-4">
              Software Ecosystem
            </h2>
            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 uppercase italic leading-none">
              Intelligent
              <br />
              Integration.
            </h3>
            <p className="text-on-surface-variant text-xl leading-relaxed font-body">
              These systems are fully integrated components of your digital supply chain, communicating in real time with existing WMS and WCS systems.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/30">
            {integrations.map((integration, index) => {
              const icons = ["settings_input_component", "monitor_heart", "analytics"];
              return (
                <div
                  className={`p-12 hover:bg-surface-container-low transition-colors group ${
                    index < integrations.length - 1 ? "border-r border-outline-variant/30" : ""
                  }`}
                  key={integration}
                >
                  <div className="w-12 h-12 bg-primary flex items-center justify-center mb-8 group-hover:bg-secondary transition-colors">
                    <span className="material-symbols-outlined text-white">{icons[index] || "hub"}</span>
                  </div>
                  <h4 className="text-xl font-black mb-4 uppercase tracking-tight">
                    {integration}
                  </h4>
                  <p className="text-on-surface-variant text-sm font-body leading-relaxed">
                    {features[index]?.description || page.data.summary}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-20 p-10 md:p-16 bg-primary text-white flex flex-col md:flex-row items-center gap-12 group">
            <div className="flex-1">
              <h4 className="text-3xl font-black mb-4 uppercase tracking-tight italic">
                Request a System Compatibility Audit
              </h4>
              <p className="text-on-primary-container text-lg font-body max-w-2xl opacity-80">
                Our engineering team will assess your current infrastructure and provide a detailed integration roadmap for a seamless transition.
              </p>
            </div>
            <Link
              className="bg-secondary text-white px-10 py-5 rounded-sm font-bold text-xs tracking-[0.2em] uppercase hover:bg-secondary-container transition-all whitespace-nowrap shadow-xl"
              href="/contact"
            >
              Talk to an Architect
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function LiftingAgvBody() {
  return (
    <main>
      <section className="relative min-h-[870px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 opacity-40">
          <img
            alt="Lifting AGV hero background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlS56zjskWg97-Qtj755XE3xARQj2LpBCmKnBOh_hbrjwItOvu9loDGqgQtK0izm2j1_9-VBm1KJ8_KDsOx8T-0wkiV2iKX7jw6I3EE7QIi0SOopTh4_TbHLbcMMKCOFVzNgHIbjw5HE5BZH7fewQPNX7mebAu5XSUl5bhlfiWxS4oBXfaStHL1ipgVPwqNrw16yzOyhfXIm2fVHU2h7gimnNjK5BWBI1O573o9T8FMaLWNt5EdftZwjHr2jeC8z7fyzT0FuOXzx5h"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <span className="font-label text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4">
              Industrial Logistics Systems
            </span>
            <h1 className="font-headline text-6xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tighter mb-6">
              Lifting AGV
            </h1>
            <p className="text-on-primary-container text-xl md:text-2xl max-w-xl font-light leading-relaxed mb-10">
              Precision internal transport for workstation supply and supermarket replenishment. Engineered for high-throughput environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="bg-gradient-to-b from-secondary to-on-secondary-fixed-variant text-white px-8 py-4 rounded-md font-bold tracking-tight shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
                href="/contact"
              >
                Explore Specifications
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                className="border border-outline-variant/30 text-white px-8 py-4 rounded-md font-bold hover:bg-white/5 transition-all"
                href="/case-studies"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5">
              <h2 className="font-headline text-4xl font-bold tracking-tight text-primary mb-8">
                Adaptive Internal Mobility
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                The Lift-top AGV is the cornerstone of flexible internal movement. Designed to autonomously slide beneath carts and specialized racks, it employs a heavy-duty vertical lift mechanism to mobilize goods without manual intervention.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                By decoupling the transport unit from the load carrier, Huizong Intelligent Automation enables a lean logistics flow that adapts in real time to production shifts and inventory demands.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "1,500kg", label: "Max Payload" },
                    { value: "1.8m/s", label: "Travel Speed" },
                    { value: "+/-5mm", label: "Stop Accuracy" },
                    { value: "24/7", label: "Auto-Charging" }
                  ].map((metric) => (
                    <div
                      className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant/10"
                      key={metric.label}
                    >
                      <div className="text-secondary font-bold text-3xl mb-1">{metric.value}</div>
                      <div className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface-container-low">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase block mb-4">
              Deployment Dynamics
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-primary tracking-tight">
              Application Scenarios
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
            <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between relative overflow-hidden group border border-outline-variant/20 shadow-sm">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">
                  precision_manufacturing
                </span>
                <h3 className="text-2xl font-bold text-primary mb-3">Workstation Supply</h3>
                <p className="text-on-surface-variant max-w-md">
                  Seamless delivery of raw materials and sub-assemblies directly to production lines with precise timing and positioning.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-10 group-hover:opacity-20 transition-opacity">
                <img
                  alt="Workstation supply"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3qRrRj4ZoRIJuEVvpmxpUs_fpdXE1v63ecJt3M_uEIPlnPZgulUdLho66MLCS5S8YnuxuJpH3JcdckXx58YgM9UCqdZ7zLN5HTUMGOqme7EtGGseq7d20b7yCBUkMVoD3E8dJir8BmYKNxjLMkeDWaaKYBNFJQ0f6IvBftZ7_LRc56aq-JT2jgceDrg_FxuA8DqKH_lAv7P6Zv6UPfPZc78hBl7JuKREyKt2oAMdTp8aoFY8mPFmBom0KmEEHQkJCL3vMd9l8NWxX"
                />
              </div>
            </div>
            <div className="bg-primary text-white rounded-xl p-8 flex flex-col justify-between border border-primary-container shadow-sm">
              <div>
                <span className="material-symbols-outlined text-secondary-fixed text-4xl mb-6">
                  local_mall
                </span>
                <h3 className="text-2xl font-bold mb-3">Supermarket Replenishment</h3>
                <p className="text-on-primary-container">
                  Automated flow from bulk storage to staging zones, ensuring pick-faces are always stocked for rapid fulfillment.
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between border border-outline-variant/20 shadow-sm">
              <div>
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">
                  shopping_cart
                </span>
                <h3 className="text-2xl font-bold text-primary mb-3">Cart Transfer</h3>
                <p className="text-on-surface-variant">
                  Standardized handling of manual carts and trolleys, bridging the gap between human operators and automated zones.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 bg-surface-container-high rounded-xl p-8 flex flex-col justify-between relative overflow-hidden border border-outline-variant/10 shadow-sm">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">route</span>
                <h3 className="text-2xl font-bold text-primary mb-3">Flexible Routes</h3>
                <p className="text-on-surface-variant max-w-lg">
                  Dynamic pathfinding that bypasses obstacles and reconfigures instantly when warehouse layouts change.
                </p>
              </div>
              <div className="absolute bottom-[-20%] right-[-10%] w-2/3 h-1/2 opacity-20 rotate-[-15deg]">
                <span className="material-symbols-outlined text-[300px] text-primary">map</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-headline text-4xl font-bold text-primary tracking-tight mb-6">
                Engineered Advantages
              </h2>
              <p className="text-on-surface-variant">
                Precision is not an option; it is our standard. Our Lifting AGVs provide the competitive edge required for modern logistics.
              </p>
            </div>
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Shared Aisle Use",
                  copy:
                    "Advanced LiDAR and sensory arrays allow for safe, collaborative movement alongside human workers and manual forklifts."
                },
                {
                  title: "Route Flexibility",
                  copy:
                    "No physical floor markers or magnetic tape required. SLAM-based navigation enables instant route modification via software."
                },
                {
                  title: "Station Response Speed",
                  copy:
                    "Proprietary dispatching logic ensures the nearest available AGV is tasked, reducing latency and idle time by up to 35%."
                }
              ].map((item) => (
                <div className="flex flex-col gap-4" key={item.title}>
                  <div className="w-12 h-1 border-t-4 border-secondary mb-4" />
                  <h4 className="text-xl font-bold text-primary">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-primary text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 p-4 md:p-6">
              <div className="relative h-[400px] w-full max-w-[640px] mx-auto bg-primary-container rounded-xl flex items-center justify-center p-12 md:p-14 border border-on-primary-fixed-variant/20">
                <div className="grid grid-cols-3 gap-6 w-full text-center">
                  {[
                    { title: "WMS", label: "Warehouse Management" },
                    { title: "Fleet", label: "Control Hub", accent: true },
                    { title: "WCS", label: "Control System" }
                  ].map((item) => (
                    <div
                      className={`p-4 rounded-lg border ${
                        item.accent
                          ? "bg-secondary/20 border-secondary/30 scale-110 shadow-xl shadow-secondary/10"
                          : "bg-surface/5 border-white/10 backdrop-blur-md"
                      }`}
                      key={item.title}
                    >
                      <div className={`font-bold text-lg mb-1 ${item.accent ? "text-white" : "text-secondary"}`}>
                        {item.title}
                      </div>
                      <div className={`text-[10px] uppercase tracking-tighter ${item.accent ? "opacity-80" : "opacity-60"}`}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <div className="w-64 h-64 border border-secondary rounded-full animate-pulse" />
                  <div className="absolute w-96 h-96 border border-secondary/50 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-secondary-fixed-dim font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                Ecosystem Synergy
              </span>
              <h2 className="font-headline text-4xl font-extrabold tracking-tight mb-8">
                Seamless Integration Framework
              </h2>
              <p className="text-on-primary-container text-lg leading-relaxed mb-8">
                Huizong Intelligent Automation AGVs are not isolated machines; they are nodes in an intelligent network. Our API-first approach ensures effortless connection to your existing WMS and WCS.
              </p>
              <ul className="space-y-4">
                {[
                  "Centralized fleet coordination via dispatch manager",
                  "Real-time status monitoring and predictive maintenance alerts",
                  "Scalable infrastructure - add 1 or 100 AGVs without system rework"
                ].map((item) => (
                  <li className="flex items-start gap-3" key={item}>
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-surface text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-5xl font-black text-primary tracking-tighter mb-6 uppercase">
            Ready to Transform Your Throughput?
          </h2>
          <p className="text-on-surface-variant text-xl mb-12">
            Consult with our senior logistics engineers to design a custom Lifting AGV workflow tailored to your facility.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              className="w-full sm:w-auto bg-secondary text-white px-10 py-5 rounded-md font-extrabold text-lg shadow-xl hover:translate-y-[-2px] transition-all"
              href="/contact"
            >
              Schedule an Expert Consultation
            </Link>
            <button className="w-full sm:w-auto text-primary font-bold px-10 py-5 hover:bg-surface-container-low rounded-md transition-all">
              Download Technical Data Sheet
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function StorageAgvBody() {
  return (
    <main>
      <section className="relative min-h-[819px] flex items-center overflow-hidden bg-primary-container">
        <div className="absolute inset-0 opacity-40">
          <img
            alt="Modern high-tech warehouse interior"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy0IZwrrWtiZK-vVe43o3YRuspV_4K9Srbhgwsbs5o7FFCYEQChywe1gia7t-tqT1FdTtsD9pWaoPTLo7p5r0XLdpJ1-ka7VjdRy1aVy_K2BtmPSbcq0P2snILNLy0bwrJGA0Bla0GiAZODoFcTqe39i1AFLK27u6_7jx2w1Xx1l-KsyiZG6KjfiY68lpASKDE50nb9MGGR4N3Xh0AbqOEKhPseDcvZz3brHIk1XJ5h3u2n5a7zoYqJ_vMF1srKFle9wSBJKulavPQ"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/80 to-transparent" />
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary-fixed-dim rounded-full text-xs font-bold tracking-[0.1em] uppercase mb-6 font-label">
              Precision Logistics
            </span>
            <h1 className="text-white font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Storage AGV
            </h1>
            <p className="text-primary-fixed font-body text-xl md:text-2xl leading-relaxed mb-10 opacity-90">
              Engineered for high-density buffer zones and automated inventory flow control. Precision in every movement.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-secondary text-on-secondary px-8 py-4 rounded-md font-headline font-bold text-lg hover:bg-secondary-container transition-all shadow-xl shadow-black/20">
                Request a System Audit
              </button>
              <button className="bg-transparent border border-outline-variant text-white px-8 py-4 rounded-md font-headline font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                Download Product Spec Sheet
              </button>
            </div>
          </div>
          <div className="hidden lg:block relative h-[500px]">
            <div className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 p-4 transform translate-x-8 -translate-y-4">
              <img
                alt="Storage AGV product"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9rZzjp0QN7jtjKCQ2frejviAZqNKZmJmCoH1aX7KrOg5_fo0bx76JZVEvJlXFJeuAx7O-ByliS9rHJTszRLb9OKGSqJtl61Jg5l5sXLmUXnNTE4B4Syd9ISEKzVB7zaLm6VPRLPgl60Q2Fh4xCRoYA16YhLxaAojGluz0CYEP4agQ67erfMJtgNkNDzpnf6n-yOuFVAqrijXo7DaE7ZC1HShnTXsS0BG7bk_ukbv7G5g_5gHMtWIW2dQtwRC1jdYBJb0J34vJgUKp"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="font-headline text-4xl font-bold text-primary mb-8 leading-tight">
                The Backbone of Automated Storage
              </h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                Our Storage AGV isn't just a vehicle; it's the critical link in your automated storage structures. Designed with zero-tolerance engineering, it ensures surgical precision and relentless speed in material release, transforming static storage into a dynamic, high-performance ecosystem.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: "grid_view",
                  title: "Space Efficiency",
                  copy: "Reduced footprint, maximizing vertical and horizontal density."
                },
                {
                  icon: "speed",
                  title: "Retrieval Speed",
                  copy: "High-throughput cycles optimized for peak demand periods."
                },
                {
                  icon: "account_tree",
                  title: "Expansion Flexibility",
                  copy: "Scalable modules that evolve alongside your industrial operations."
                }
              ].map((item) => (
                <div
                  className="p-8 bg-surface-container-low rounded-xl group hover:bg-surface-container-high transition-all"
                  key={item.title}
                >
                  <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                    {item.icon}
                  </span>
                  <h3 className="font-headline font-bold text-primary mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface-container-low">
        <div className="px-4 md:px-6 lg:px-8">
          <div className="mb-16">
            <span className="font-label text-xs font-bold tracking-widest text-secondary uppercase block mb-2">
              Deployment Framework
            </span>
            <h2 className="font-headline text-4xl font-bold text-primary">Application Scenarios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-full lg:h-[600px]">
            <div className="md:col-span-3 lg:col-span-4 bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col relative group">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <img
                  alt="Dense buffer zones"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAqqVftNXRE9o0toJOXD-Pia6weWqAkNpUNpI51qgly1lpQyvmp0t97BnZBoBR02Tvy1y3trejSmoZluzzYuU9FFufezhvlv69cwEx43cmKdVUJv7QogXzccrHzCiXBXOAFwi2I0WtawCqxw14tXAC8sHwPOiNM-IsQ-jPYSXw3b2iSmGmv73siIMKvzww5O3ak8FtyGAXwFqDMapTOHelZOrEoSHxYyNQ8cQyeabWNB7A3y0GDzwgUqwdvSway1SI9aDpABu9Bo12"
                />
              </div>
              <div className="p-10 relative z-10 mt-auto">
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                  Dense Buffer Zones
                </h3>
                <p className="font-body text-on-surface-variant max-w-lg mb-6">
                  Maximizing vertical and horizontal space usage through adaptive navigation algorithms that eliminate wasted aisles.
                </p>
                <div className="h-1 w-12 bg-secondary group-hover:w-24 transition-all" />
              </div>
            </div>
            <div className="md:col-span-3 lg:col-span-2 bg-primary rounded-xl p-10 flex flex-col justify-between text-white group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 scale-150">
                <span className="material-symbols-outlined text-9xl">sync_alt</span>
              </div>
              <div>
                <h3 className="font-headline text-2xl font-bold mb-4">Automated Transfer</h3>
                <p className="text-primary-fixed opacity-80 mb-8 leading-relaxed">
                  Seamless handovers between long-term storage and high-speed transport zones with millisecond precision.
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-secondary">arrow_forward</span>
            </div>
            <div className="md:col-span-6 bg-surface-container-highest rounded-xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center group">
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-4">
                  Storage Release
                </h3>
                <p className="font-body text-on-surface-variant text-lg">
                  Rapid, controlled retrieval for downstream processes. Our system predicts demand spikes to stage inventory for immediate release.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden h-48 lg:h-64 shadow-lg bg-surface">
                <img
                  alt="Storage release"
                  className="w-full h-full object-cover opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Gn5J3k3v7C_YQ218y7iVsG3MPY3GNGwuWiIB2vPOR2tiah8PvlTN4gpgfPzqksp0Ik5CxXFZIMSt27_4NNmasO75Tza5nSnxOYigzzkoDbwHK15fLent88yLPNufOhfPC4UySsnbsVsfHTFbT1QZmXvBY7kxnhAtkZCbSG1pZFtwFD-x2xvqN5hAWYsPVgFFNOEdOc4fWE4hQewAD3FVtsMLEl0nK_WVUGg5VPIoIvtiyxq9EmlE4HYcl_Q3lS4wgFVUiiFadJRy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#7594cb,transparent)] opacity-20" />
        </div>
        <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
          <div className="bg-surface-container-lowest/10 backdrop-blur-xl border border-white/10 rounded-xl p-12 lg:p-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-label text-xs font-bold tracking-widest text-secondary-fixed-dim uppercase block mb-4">
                  System Integration
                </span>
                <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
                  The ASRS Synergy
                </h2>
                <p className="font-body text-xl text-primary-fixed opacity-90 leading-relaxed mb-8">
                  Integration is not an afterthought. The Storage AGV acts as the kinetic extension of your ASRS (Automated Storage and Retrieval Systems). By bridging the gap between static racking and mobile logistics, we create a complete, zero-error high-density storage solution that operates 24/7.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-4">
                    {[
                      { icon: "robot_2", className: "bg-secondary" },
                      { icon: "hub", className: "bg-primary-container" },
                      { icon: "lan", className: "bg-on-primary-container" }
                    ].map((item) => (
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-primary ${item.className}`}
                        key={item.icon}
                      >
                        <span
                          className="material-symbols-outlined text-white text-xl"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {item.icon}
                        </span>
                      </div>
                    ))}
                  </div>
                  <span className="text-white font-headline font-bold text-sm">
                    Unified Control Architecture
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-xl overflow-hidden aspect-video shadow-2xl">
                  <img
                    alt="System integration"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkSq4B_JdV_Po8h-Y8NEdTnzUYTsyDX142bP4Z-fXxgvP6CSMfx06Qwy9EQfZawWQdAXEHLpd3FVlrMkhWsGBpZKmGAgFjzrjCx82FPP9lN0m_Eu_BtCADzH7iuQSGpUKAU9qb_6kLSHtytR-nWIr6VjRv_nz0nQ6Yvpu2JFCY1TuTX2gWnXvUo9sV7i5sLuDul0BQR81MkQemYjhMCyRo5qUF8YGvLd2viLUpx-nJOTdaCIgfgmWbQALsWDVBoV_DkiWdV_JuZm6y"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white/70 backdrop-blur-[16px] p-6 rounded-lg border border-outline-variant shadow-xl max-w-xs">
                  <p className="text-secondary font-headline font-bold text-sm mb-1">REAL-TIME SYNC</p>
                  <p className="text-on-surface text-xs leading-relaxed">
                    System-wide synchronization with 99.9% uptime and adaptive pathfinding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface-container-low text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-8">
            Optimize Your Inventory Flow Today
          </h2>
          <p className="font-body text-xl text-on-surface-variant mb-12">
            Join the world's most advanced logistics facilities in deploying precision AGV technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="w-full sm:w-auto bg-secondary text-on-secondary px-10 py-5 rounded-md font-headline font-extrabold text-xl hover:bg-secondary-container transition-all shadow-lg active:scale-95">
              Request a System Audit
            </button>
            <button className="w-full sm:w-auto bg-white border-2 border-primary text-primary px-10 py-5 rounded-md font-headline font-extrabold text-xl hover:bg-primary hover:text-white transition-all active:scale-95">
              Download Product Spec Sheet
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function AgvRollerBody() {
  return (
    <main className="bg-surface">
      <section className="relative min-h-[819px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-primary overflow-hidden">
          <img
            alt="Precision machinery"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArw249Fk7e6MkcQg4J9a5JtD6JQeqZ8BqCjOo24uLvsoE7GUbGXDQb4enKQVRw2rjrNRMWOnZLh6e0fa48CkgClYgcyK9kvkqxb1rzc615RnSII9pyo3WEBUyXrWtLHzDS2KJvryCLeRcOzeMfI7VZnG27JurnTBLQXLOKLpSb5mt1SHN7i5YYIToIxkx7Ju73NoP4k2uFKzNRiAidoCqeB15wS-rwbpe4t3UgXDaa9vbpjL8tYpYXA-Yed03xZHWShWWWqUzhfN9O"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent opacity-90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 w-full">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6 rounded-sm">
              High-End Automation
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white leading-tight tracking-tighter mb-6">
              AGV Roller
            </h1>
            <p className="text-2xl md:text-3xl text-on-primary-container font-light leading-relaxed mb-10 max-w-2xl">
              Seamless Material Transfer &amp; Conveyor Integration
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-secondary text-white font-bold rounded-md hover:translate-y-[-2px] transition-all shadow-xl shadow-secondary/20">
                Request Specifications
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-md hover:bg-white/20 transition-all">
                View Technical Drawings
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5">
            <h2 className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-4">
              Precision Engineering
            </h2>
            <h3 className="text-4xl font-headline font-bold text-primary mb-6">
              The Flexible Link in Modern Logistics
            </h3>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              The AGV Roller represents the pinnacle of hybrid automation. By bridging the gap between static conveyor infrastructures and dynamic mobile operation zones, it ensures continuous flow without the need for manual intervention or expensive fixed-path modifications.
            </p>
          </div>
          <div className="md:col-span-7 bg-surface-container-low p-8 rounded-xl flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              {[
                {
                  icon: "link",
                  title: "Hybrid Integration",
                  copy: "Connects legacy systems to modern mobile fleets."
                },
                {
                  icon: "bolt",
                  title: "Zero Downtime",
                  copy: "Continuous operation with fast-swap battery modules."
                }
              ].map((item) => (
                <div
                  className="bg-surface-container-lowest p-6 rounded-lg border-b-2 border-secondary/20"
                  key={item.title}
                >
                  <span className="material-symbols-outlined text-secondary text-4xl mb-4">
                    {item.icon}
                  </span>
                  <p className="font-bold text-primary">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-12 max-w-7xl mx-auto bg-surface-container-low">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary mb-4">
              Application Scenarios
            </h2>
            <p className="text-slate-500">Designed for complex industrial throughput requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group overflow-hidden rounded-xl bg-primary h-[400px]">
              <img
                alt="Conveyor handoff"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtRWqW-kP_QuonY48KqZmlw_WwARMqPqguYe71bXM9o_CyjGIFALfW5jEWGM7VCt0_VbLg60xAR_u7f4nTkxMkvMR3rxOSky6JLqn53q9g0LE-9LyD7e5URQsMs-nWLP2ZDhhM5CLptkg7BACuaRlqRoaVw5xhVhvoIEhgDtIPzl562moNsVi5D_vkigef_afvJ0OkHS_Z_krOlNZ53tD1IHbU2kgkyM_APXJ3lxTmY3FIGmojt4yjZeJIr7esPZ-hOrTs0e7Zi-qc"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h4 className="text-2xl font-bold text-white mb-2">Conveyor Handoff</h4>
                <p className="text-on-primary-container max-w-md">
                  Smooth, synchronized transitions from fixed lines to mobile units with millimeter precision.
                </p>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl bg-surface-container-lowest h-[400px] border border-outline-variant/20">
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">inventory_2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">Carton Transfer</h4>
                  <p className="text-on-surface-variant">
                    High-speed handling of boxes and small containers with adaptive weight sensing.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl bg-surface-container-lowest h-[400px] border border-outline-variant/20">
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">package_2</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary mb-2">Packing Transfer</h4>
                  <p className="text-on-surface-variant">
                    Moving goods seamlessly between sorting docks and final packing stations.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-2 relative group overflow-hidden rounded-xl bg-primary h-[400px]">
              <img
                alt="Adaptive routing"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMqNiL7AtmK4bDF7g2chpAV85dWyFlgPG3nRcpIW6ohpBYUNb0BQN5peRQmleM9M1d9SYjUFX2hl_hCyhmLUUcWgiLDSOWpH-Jy1wUdtsM10Ap0ZVTqy_qMqrkj160yejyeEz-Y4cjQduYuGCmi5jCA-sO3f6rj-peTh4Herm89nhttBbObWcccIa7wVob74sTHIm9_feVMstWXyMbNrYzPGYLNLdO8g9SA_QK_C5RozBQckun_2x6vcZRPv6jYFBTcSpaNLohaS8l"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h4 className="text-2xl font-bold text-white mb-2">Adaptive Routing</h4>
                <p className="text-on-primary-container max-w-md">
                  Real-time reconfiguration of logistics paths without the need for physical track updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              number: "01",
              title: "Hybrid Automation",
              copy: "Bridges the critical gap between fixed conveyor belts and flexible mobile zones, creating a unified flow ecosystem."
            },
            {
              number: "02",
              title: "Modular Routing",
              copy: "Easily scalable architecture that allows you to add units and redefine paths via software, not hardware."
            },
            {
              number: "03",
              title: "Fixed-to-Mobile",
              copy: "Enhances end-to-end throughput by removing manual touchpoints at transfer interfaces."
            }
          ].map((item) => (
            <div className="flex flex-col items-start" key={item.title}>
              <div className="mb-6 text-secondary font-black text-6xl opacity-20">{item.number}</div>
              <h4 className="text-xl font-bold text-primary mb-4">{item.title}</h4>
              <p className="text-on-surface-variant">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-headline font-bold mb-8">Ecosystem Synergy</h2>
            <p className="text-on-primary-container text-xl leading-relaxed mb-8">
              The AGV Roller is not an isolated component. It is engineered to perform in perfect concert with 'Material Handling' software and hardware ecosystems.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time API integration with WMS platforms",
                "Dynamic load balancing across multiple AGV fleets",
                "Autonomous charging and maintenance scheduling"
              ].map((item) => (
                <li className="flex items-center space-x-3" key={item}>
                  <span className="material-symbols-outlined text-secondary">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 bg-white/5 p-4 rounded-2xl backdrop-blur-xl border border-white/10">
            <img
              alt="Ecosystem synergy"
              className="rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy_t3sqPUExnSR2iuJFBYYpqg7KPAX4RrSp4iTGLIy7zX3ICUcrroWYVSNpT137PwwA1UQtW_MWn0vJ5ugcim3uOxUXKndSZqGitKoydT9RW1rFf4vFy5XUbCyL8l5bts2juxcxVooE4Ume7dfXTJ8D-kzPSTvFs8O1K31kSbIVtukWtznGqztRtlmoeeaXIjreQBWtz4jSpxQHk_0SCEKvfK-FMoFMtGrpxl6jS5jjyjGliYjQ0pnax7wh5myjCWi7zT-nJ2Q5-GS"
            />
          </div>
        </div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </section>

      <section className="py-24 bg-surface flex flex-col items-center justify-center text-center px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-primary mb-6 tracking-tighter">
            Optimize Your Conveyor Network
          </h2>
          <p className="text-on-surface-variant text-lg mb-12">
            Consult with our systems architects to design a bespoke mobile transfer solution tailored to your facility's unique throughput requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-secondary text-white font-bold rounded-md hover:bg-secondary-container transition-all shadow-xl shadow-secondary/20">
              Request Specifications
            </button>
            <button className="px-10 py-5 border-2 border-primary text-primary font-bold rounded-md hover:bg-primary hover:text-white transition-all">
              Consult an Expert
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function CompositeMobileRobotBody() {
  return (
    <main>
      <section className="relative h-[870px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            alt="Composite Mobile Robot"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkFe54W91kOQWoHqGbwB6dzJldIkJ5zpa0k6zpN8tJu_acx6hARMpvxGFywrbhnrE1o4tZRLoPnsltaVanzWQhSuVXsFPoxEkvijoyhe-_hK614xebINBPZIUjr-T6MqA6SiR9TJrbremFLVS8tVCuYeWxbiVLmJ9SXKBunOEGYOYhD1rbKKwOWXs9RVRxfq4ZeKvig65QokQRDtAc8bUJgja9QQI30yokMFWUw6JH9eueEw9qNUp-CL-mRN6-oDXbsrON7a7CLYQl"
          />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-black tracking-widest uppercase bg-secondary-container text-on-secondary-container rounded-sm">
              Industrial Grade Robotics
            </span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white tracking-tighter leading-[0.9] mb-8">
              Composite <br />
              Mobile Robot
            </h1>
            <p className="text-xl md:text-2xl text-primary-fixed-dim font-light leading-relaxed mb-10 max-w-2xl">
              The pinnacle of mobile manipulation. Integrating advanced robotics with autonomous mobility for complex task execution in high-precision environments.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 text-white bg-secondary font-bold rounded-md hover:bg-secondary-container transition-all flex items-center gap-2 group">
                Request a Technical Consultation
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
              <button className="px-8 py-4 text-white border border-outline-variant font-bold rounded-md hover:bg-white/10 transition-all">
                Download Product Spec Sheet
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-black">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-secondary to-transparent" />
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface">
        <div className="px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight mb-8">
                Bridging the Gap in <span className="text-secondary">Flexible Automation</span>
              </h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  Traditional robotics forces a choice between mobility and manipulation. Stationary arms are fixed to work-cells, while mobile platforms are limited to simple logistics.
                </p>
                <p className="font-semibold text-primary">
                  The Composite Mobile Robot (CMR) eliminates this boundary through advanced 'mobile manipulation'.
                </p>
                <p>
                  By fusing a high-precision robotic arm with an autonomous navigation base, the CMR performs complex, adaptive task execution while in transit. This enables a level of operational fluidity previously impossible in industrial settings.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8">
                {[
                  { value: "0.02mm", label: "Arm Precision" },
                  { value: "2.5m/s", label: "Transit Speed" }
                ].map((item) => (
                  <div className="border-l-2 border-secondary-container pl-6" key={item.label}>
                    <div className="text-3xl font-black text-primary">{item.value}</div>
                    <div className="text-sm uppercase tracking-wide text-outline font-bold">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-surface-container-high rounded-xl overflow-hidden shadow-2xl">
                <img
                  alt="Robotic interface"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWgL_wtpOJOSE4yrXxADz2t-Cd3jrFIo2cBCGgf5Rr1KfivuW3gmwcqNIABnnrHD8P1G5066BZ4WIKNhMAVWBD-yurone_fkkKZF-yiIlIzgEfyutiPqoFXm9pSGS_fuuZNweDUFCjAJU-40LJ4S7LO3MAlCmcHzxYtyvGLplavn66nd8tXLjk3rvfQlUDIz8GBHOpNtZ5QlwxuXjsSZiwfItuHy3Ofh74dqGliq5HDuzzt-sx39Mv47GXgUYs-OX7T2TxLd3acmu4"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white/70 backdrop-blur-[20px] p-8 rounded-xl border border-white/20 shadow-xl max-w-xs">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">memory</span>
                <h3 className="font-headline font-bold text-xl mb-2">Adaptive Logic</h3>
                <p className="text-sm text-on-surface-variant">
                  Embedded AI-driven task management allows the robot to prioritize workflows in real-time based on environment changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface-container-low">
        <div className="px-6 md:px-8 lg:px-12">
          <div className="mb-16">
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-secondary mb-4">
              Application Scenarios
            </h2>
            <h3 className="text-4xl font-headline font-bold text-primary">
              Redefining Operational Flux
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-lowest h-[500px]">
              <img
                alt="Move-and-work automation"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkF6ThDnUCpUIPmDPbrueJ83vH-KE2AIpDI426umEgIjfVd07fSkpNUSI4lJeNgPLlJFpAIO0DjHo1YHUpCofFeQ9LF0WV7l_Y7cHds3AL6Ajo0l1W_l_MnWAX_yhDkmTqVEbfmUSHCQyE0FTzes7aov23NfFK2GeSzYFUzsjMTh2ODhJFA6ZvC3z1GnkjhXz3TpIJcATg15Z2jSpsJz9m-Ic06CbFnD9Tnx4nTdngdu-4kDE_qbHMcDF1yXtLKJY1mOhyDEEOh7Hf"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-10">
                <h4 className="text-3xl font-headline font-bold text-white mb-4">
                  Move-and-Work Automation
                </h4>
                <p className="text-primary-fixed-dim text-lg max-w-md">
                  CMR units perform assembly, inspection, and maintenance tasks while in transit between stations, maximizing uptime and reducing bottlenecking.
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-primary h-[500px]">
              <div className="absolute inset-0 p-10 flex flex-col justify-end z-20">
                <h4 className="text-2xl font-headline font-bold text-white mb-4">
                  Flexible Fulfillment
                </h4>
                <p className="text-primary-fixed-dim text-sm">
                  Dynamic sorting for high-variability order picking. Perfect for e-commerce hubs requiring rapid layout adaptation without infrastructure changes.
                </p>
              </div>
              <img
                alt="Logistics warehouse"
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPDSZ8xqcXQbA1mRojhVWkYkXhN954HexXdny8-f4O6wUqk8nrYKSPjdJZPVj3-m17drzLTiSpZeU_leGeoJuHKdO-6czIVyMiPhS4NhcDUHYXk-zT3QHazquPfZzGqW-AMtsfEd0Z_TMw68WYpLdx5kJFckFl6YZEAin1TJtjVK0t0goYj0nQsip43gl0-35YQHkGrsBUwXQwtv8ByLhr0gY6rmqEALy4ixmbyC7Gc9n6ugJd6vUfTLUTh3qHCMlRxMxTDEh-PLSt"
              />
            </div>
            <div className="md:col-span-3 group relative overflow-hidden rounded-xl bg-surface-container-lowest h-[400px]">
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                  <span
                    className="material-symbols-outlined text-secondary text-5xl mb-6"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    precision_manufacturing
                  </span>
                  <h4 className="text-3xl font-headline font-bold text-primary mb-4">
                    Point-of-Use Handling
                  </h4>
                  <p className="text-on-surface-variant text-lg">
                    Eliminate fixed delivery points. CMRs deliver materials and immediately perform the required operation directly at the assembly point, creating a seamless production loop.
                  </p>
                </div>
                <div className="w-full md:w-1/2 overflow-hidden">
                  <img
                    alt="Robotic hand"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5xKwlYlFhbAIgUnLBeG-L94tyDomUvHPeTKwN1ZeyVdGMTKUn6U93c3lN2W_qWgadETVYE3jO9O5xPMrycgZFMop-jLlhgOrCgRYqsQ38WfeubAOF7L5MB54Cs_QSTFOrWxroz2rkhcWGFAjFuhLCP80i4fZntP5WPH-kCVXuAtN2TKyONkX4DszUbIBDzgxcwU4Jui9u1Gh9X6jNF5H2HIPrh3mD8NUEZeZ3nh-RimvGkCuk6k-FrUQKqddIk_DX0jfzL9oEqiak"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-container/10 -skew-x-12 translate-x-1/2" />
        <div className="relative z-10 px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mb-20">
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight">
              Engineering the Zero-Tolerance Advantage
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Workflow Adaptability",
                copy: "No two warehouse cycles are identical. Our CMR platform features rapid re-configuration logic, allowing you to switch between tasks like sorting, inspection, and delivery in minutes, not days."
              },
              {
                title: "Task Diversity",
                copy: "Equipped with multi-purpose end-effectors, the robot handles everything from fragile electronics to 20kg industrial parts with the same level of consistent stationary precision."
              },
              {
                title: "Hybrid Execution",
                copy: "Combines the navigational intelligence of an AMR with the dexterity of a 6-axis cobot. It doesn't just transport value; it creates value at every point in the facility."
              }
            ].map((item) => (
              <div className="space-y-6" key={item.title}>
                <div className="w-12 h-1 bg-secondary" />
                <h4 className="text-2xl font-headline font-bold">{item.title}</h4>
                <p className="text-primary-fixed-dim leading-relaxed">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-surface">
        <div>
          <div className="bg-surface-container-lowest rounded-xl p-12 md:p-20 shadow-sm border border-outline-variant/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-headline font-bold text-primary mb-8">
                  Seamless Ecosystem Integration
                </h2>
                <p className="text-lg text-on-surface-variant mb-10">
                  The CMR is designed to act as the connective tissue of your automated facility. It integrates natively with our Fleet Management Software and Picking Solutions for a unified orchestration of assets.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary mt-1">hub</span>
                    <div>
                      <span className="block font-bold text-primary">Fleet Management Synergy</span>
                      <span className="text-sm text-on-surface-variant">
                        Real-time path optimization and traffic control in mixed operation environments.
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary mt-1">
                      settings_input_component
                    </span>
                    <div>
                      <span className="block font-bold text-primary">Flexible Picking Integration</span>
                      <span className="text-sm text-on-surface-variant">
                        Plug-and-play compatibility with standard automated storage and retrieval systems (AS/RS).
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "lan", label: "Unified API" },
                  { icon: "security", label: "Certified Safety" },
                  { icon: "monitoring", label: "Edge Analytics" },
                  { icon: "cloud_sync", label: "Digital Twin" }
                ].map((item) => (
                  <div
                    className="aspect-square bg-surface-container rounded-lg flex flex-col items-center justify-center p-8 text-center hover:bg-primary-container group transition-all duration-300"
                    key={item.label}
                  >
                    <span className="material-symbols-outlined text-4xl mb-4 text-primary group-hover:text-white">
                      {item.icon}
                    </span>
                    <span className="font-headline font-bold group-hover:text-white">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div>
          <div className="relative overflow-hidden bg-primary-container rounded-xl p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white mb-8">
                Ready to Architect Your <br />
                Next-Gen Workflow?
              </h2>
              <p className="text-xl text-primary-fixed-dim max-w-2xl mx-auto mb-12">
                Connect with our engineering specialists to discuss your specific operational challenges and discover how composite mobility can transform your throughput.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button className="px-10 py-5 text-white bg-secondary font-bold rounded-md hover:bg-secondary-container transition-all">
                  Request a Technical Consultation
                </button>
                <button className="px-10 py-5 text-white border border-outline-variant font-bold rounded-md hover:bg-white/5 transition-all">
                  View Technical Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SolutionsInquiryForm() {
  return (
    <form
      className="space-y-8"
      data-form-label="Solutions Page Consultation Form"
      data-form-type="consultation"
      data-hsa-form=""
      data-success-message="Thanks, your consultation request has been emailed to our team."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <label className="block text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">
            Full Name
          </label>
          <input
            className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 transition-all py-3 px-4 text-primary text-sm font-medium rounded-none"
            name="fullName"
            placeholder="John Doe"
            required
            type="text"
          />
        </div>
        <div className="relative">
          <label className="block text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">
            Phone
          </label>
          <input
            className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 transition-all py-3 px-4 text-primary text-sm font-medium rounded-none"
            name="phone"
            placeholder="+1 (555) 000-0000"
            type="tel"
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">
          Business Email
        </label>
        <input
          className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 transition-all py-3 px-4 text-primary text-sm font-medium rounded-none"
          name="email"
          placeholder="john.doe@company.com"
          required
          type="email"
        />
      </div>
      <div>
        <label className="block text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-3">
          Project Brief
        </label>
        <textarea
          className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant focus:border-secondary focus:ring-0 transition-all py-3 px-4 text-primary text-sm font-medium rounded-none"
          name="message"
          placeholder="Describe your automation goals..."
          required
          rows="4"
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          className="w-4 h-4 rounded-none border-outline-variant text-secondary focus:ring-secondary cursor-pointer"
          id="solutions-newsletter"
          name="newsletterConsent"
          type="checkbox"
          value="Yes"
        />
        <label
          className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider cursor-pointer select-none"
          htmlFor="solutions-newsletter"
        >
          Subscribe to monthly Logistics Insights
        </label>
      </div>
      <button className="w-full bg-secondary text-white py-5 rounded-none font-black text-sm uppercase tracking-[0.2em] hover:bg-secondary-container transition-all flex items-center justify-center gap-3" type="submit">
        Request Consultation
        <span className="material-symbols-outlined text-sm">send</span>
      </button>
    </form>
  );
}

function SolutionOverviewBody({ page }) {
  const cards = page.data.cards || [];
  const asrs = cards.find((card) => card.slug === "asrs");
  const software = cards.find((card) => card.slug === "software");
  const material = cards.find((card) => card.slug === "material-handling");
  const picking = cards.find((card) => card.slug === "picking");

  return (
    <main>
      <section className="relative min-h-[600px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30 mix-blend-soft-light scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfujFnEmwYtviRkzf7npRhGnksP1WeNEAHg5ttqRcI1VyZfdnGr3kSTvj1_WTJPDLckYdK76sNEyQlRiq-OZ4iiyPpE4NDOlas1RDhxDPy6KT_gc1s6J4gjDWehm7G05nVABrh0e63T6KmOziLVGDB0HX9FiXfSr_KK4wWy-JFPtSCQnxJjEgBwQdFjOPRxhTSekgyBQgiPuamWVZcgLwuTBusuTsiXcJ8agv3e-xaZkuGmJsXNRoPu4GZzx3y-y-SJnqecimEKpif"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <span className="inline-block text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {page.data.kicker}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tighter mb-6">
              {page.data.title}
            </h1>
            <p className="text-xl text-on-primary-container leading-relaxed mb-10 max-w-2xl font-light opacity-90">
              {page.data.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="bg-secondary text-white px-8 py-4 rounded-none font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:bg-secondary-container transition-all"
                href="/contact"
              >
                Speak With An Expert
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
              <Link
                className="border border-white/30 text-white px-8 py-4 rounded-none font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                href="/products"
              >
                View Systems
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-3">
            Core Competencies
          </h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tighter">
            Our Precision Ecosystem
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {asrs ? (
            <Link
              className="md:col-span-7 group relative bg-surface-container-low rounded-none overflow-hidden border border-outline-variant/10 hover:border-secondary/20 transition-all duration-300"
              href="/solutions/asrs"
            >
              <div className="p-10 flex flex-col h-full z-10 relative">
                <div className="mb-auto">
                  <div className="w-12 h-12 bg-secondary/5 flex items-center justify-center rounded-none mb-8 group-hover:bg-secondary/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl text-secondary">
                      inventory_2
                    </span>
                  </div>
                  <h4 className="text-3xl font-extrabold text-primary mb-4 tracking-tight">
                    {asrs.title}
                  </h4>
                  <p className="text-on-surface-variant text-base leading-relaxed mb-8 max-w-md">
                    {asrs.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(asrs.metrics || []).map((metric) => (
                    <span
                      className="px-3 py-1 bg-surface-container-high text-primary text-[10px] font-bold rounded-none uppercase tracking-wider"
                      key={metric.label}
                    >
                      {metric.value} {metric.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-2/5 h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzXrtbkjqH7aRzBMQtLiIPlYZpP5XwVtlAv8xR_TlPMihn97CzuZy0O03otmRhlOA_pFxb9SgirTOcvxQiRTW9P5kpqRwBTBUNDOYdZVPygAP-3gBHzP2yNAvGsmsAVrQie68cAHSNWK2iOq552mQca9POTkgRdv3ndUFQRr17WMLxSYXZMpgmkgIilgBde7NSZ864IXlOCoH39l21mbYUlCbrodYCQI5wvhS5ky8_0Y0fJYI1HVYraAprhOkO-75X4aedi_D4NXy0"
                />
              </div>
            </Link>
          ) : null}
          {software ? (
            <Link
              className="md:col-span-5 bg-primary text-white rounded-none overflow-hidden p-10 flex flex-col justify-between border border-primary relative group"
              href="/solutions/software"
            >
              <div className="z-10">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-none mb-8 group-hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-2xl text-secondary">analytics</span>
                </div>
                <h4 className="text-3xl font-extrabold mb-4 tracking-tight">{software.title}</h4>
                <p className="text-on-primary-container text-base leading-relaxed mb-8 opacity-80">
                  {software.summary}
                </p>
              </div>
              <ul className="space-y-4 z-10">
                {(software.metrics || []).map((metric, index) => (
                  <li
                    className={`flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase ${
                      index < software.metrics.length - 1 ? "border-b border-white/10 pb-4" : "pb-2"
                    }`}
                    key={metric.label}
                  >
                    <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                    {metric.value} {metric.label}
                  </li>
                ))}
              </ul>
            </Link>
          ) : null}
          {material ? (
            <Link
              className="md:col-span-5 bg-white border border-outline-variant/20 rounded-none p-10 shadow-sm hover:border-secondary/30 transition-colors group"
              href="/solutions/material-handling"
            >
              <div className="w-12 h-12 bg-secondary/5 flex items-center justify-center rounded-none mb-8 group-hover:bg-secondary/10 transition-colors">
                <span className="material-symbols-outlined text-2xl text-secondary">
                  precision_manufacturing
                </span>
              </div>
              <h4 className="text-3xl font-extrabold text-primary mb-4 tracking-tight">
                {material.title}
              </h4>
              <p className="text-on-surface-variant text-base leading-relaxed mb-10">
                {material.summary}
              </p>
              <div className="space-y-1">
                {(material.metrics || []).map((metric) => (
                  <div
                    className="flex justify-between items-center py-4 border-b border-surface-container hover:bg-surface-container-low transition-colors px-2 rounded-none cursor-default"
                    key={metric.label}
                  >
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                      {metric.label}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
                  </div>
                ))}
              </div>
            </Link>
          ) : null}
          {picking ? (
            <Link
              className="md:col-span-7 bg-surface-container-low rounded-none overflow-hidden group border border-outline-variant/10"
              href="/solutions/picking"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="p-10 flex-1">
                  <div className="w-12 h-12 bg-secondary/5 flex items-center justify-center rounded-none mb-8 group-hover:bg-secondary/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl text-secondary">robot_2</span>
                  </div>
                  <h4 className="text-3xl font-extrabold text-primary mb-4 tracking-tight">
                    {picking.title}
                  </h4>
                  <p className="text-on-surface-variant text-base leading-relaxed mb-10">
                    {picking.summary}
                  </p>
                  <div className="flex gap-8">
                    {(picking.metrics || []).slice(0, 2).map((metric, index) => (
                      <div className="contents" key={metric.label}>
                        <div>
                          <p className="text-3xl font-black text-primary tracking-tighter">
                            {metric.value}
                          </p>
                          <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">
                            {metric.label}
                          </p>
                        </div>
                        {index === 0 ? <div className="w-[1px] bg-outline-variant/30" /> : null}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-2/5 bg-primary relative overflow-hidden">
                  <img
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdUnh8dxxKahx04foaBZhubiX9XVAddItfj8vNmtxaIqM0qHkfxIA9urrJSP4Wqzj2Jc_CKuAUP2ZQ1Go495KEgElXx2np3dbyVFXDgnbqU7j79iXF8JUwVZw61dHGuHSv2g9WMlR-F1sGyci2workXzX80Bd7s6F4gKtH4nngsXdGrt7DEKpz_GnnzRYFJivAfCVfVdorWEYlWaB2qYEPXaMHNXw_uhgHiNSp9LBIpO4_olcB4_BN26pzefAHKpH9bIKsP0zxU54H"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="bg-surface py-24 border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-end mb-20 gap-12">
            <div>
              <h2 className="text-xs font-bold text-secondary uppercase tracking-[0.3em] mb-3">
                The Delivery Pipeline
              </h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tighter">
                From Assessment to Go Live
              </h3>
            </div>
            <p className="text-on-surface-variant text-base leading-relaxed opacity-80 max-w-xl">
              Our systematic approach ensures that every solution is optimized for your specific facility constraints and ROI goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20">
            {(page.data.capabilities || []).map((capability, index) => (
              <div className="relative group" key={capability}>
                <div className="text-6xl font-black text-outline-variant/20 mb-6 group-hover:text-secondary/10 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h5 className="text-base font-bold text-primary mb-4 uppercase tracking-widest border-l-2 border-secondary pl-4">
                  {capability}
                </h5>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {capability} delivered through a precise engineering and commissioning sequence.
                </p>
              </div>
            ))}
            {page.data.capabilities?.length < 6
              ? ["Engineering & Build", "Installation", "Ongoing Support"]
                  .slice(0, 6 - page.data.capabilities.length)
                  .map((extra, offset) => (
                    <div className="relative group" key={extra}>
                      <div className="text-6xl font-black text-outline-variant/20 mb-6 group-hover:text-secondary/10 transition-colors">
                        {String(page.data.capabilities.length + offset + 1).padStart(2, "0")}
                      </div>
                      <h5 className="text-base font-bold text-primary mb-4 uppercase tracking-widest border-l-2 border-secondary pl-4">
                        {extra}
                      </h5>
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        Dedicated implementation support keeps facility risk low and delivery confidence high.
                      </p>
                    </div>
                  ))
              : null}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <h3 className="text-4xl font-extrabold text-primary tracking-tighter">
            Global Success Stories
          </h3>
          <Link
            className="text-secondary text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 group border-b border-transparent hover:border-secondary transition-all py-1"
            href="/case-studies"
          >
            All Case Studies
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              east
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              title: "Next-Gen Fulfillment Hub in Berlin",
              description:
                "How a major retailer achieved 40% more storage density using our custom ASRS modules.",
              tag: "E-Commerce",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCGM3NGDRrnpUdB1XW-vvKNUSg0P3nfUFK6aoOrjkmZxpE-ilzZH1fCrDJyLc93V5V3wYMPiCkllLKzMD2xbIdR9pB6ng6dP3VIXo5e9Gc5w5SDigFu_v4bRlh5-SOKA_pbfp7QmwR1JibwUqDLS1NE6o9ura_cQNIx92h6TwVtQfnzrWOFumkn27HRMZdju5PdE_df_gHn2_zMOOnaNi9nsHlltSukglj6o8v4ssMC2MZHEkQEMxO9pwX1v8hbxWSUadrEVzk1ITT3",
              href: "/case-studies/asrs"
            },
            {
              title: "Precision Parts Handling for EV Giant",
              description:
                "Synchronizing material flow across 2 million square feet with intelligent conveyor routing.",
              tag: "Automotive",
              image:
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCMqFieC7lD79o-98ljVO3R7cpwBa0SY29wUAxBkAo2KGVdaqtAUySrz1u0q41hudFIH7kCuuQFhC_t17gTDl8w1qHj_fB57tyAB9aiz1bP9X8nSYpk6rv-j9Vpxw-bkV24uFSCbuC3izu-EyGtL2mkhSRh8we7_5SbgKUlv5Eyi0ivbxHmJ29ej7QiVsBkeNeCRy_SC5AaFuKTZGPfCOnZyHxWJozJwJLVwVoDA2O33oKG9P9Phuj4n1kWebf1HK1b3Sguw_zrKeOq",
              href: "/case-studies/material-handling"
            }
          ].map((item) => (
            <Link className="group cursor-pointer" href={item.href} key={item.title}>
              <div className="relative h-[480px] rounded-none overflow-hidden mb-8 border border-outline-variant/20 shadow-sm">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  src={item.image}
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-none uppercase tracking-widest shadow-lg">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
              </div>
              <h4 className="text-2xl font-extrabold text-primary mb-4 tracking-tight group-hover:text-secondary transition-colors uppercase">
                {item.title}
              </h4>
              <p className="text-on-surface-variant leading-relaxed text-base">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-24 bg-primary text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 skew-x-[-15deg] translate-x-1/2" />
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <h3 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-8 tracking-tighter uppercase">
              Consult an Automation Architect
            </h3>
            <p className="text-xl text-on-primary-container mb-12 font-light leading-relaxed opacity-90">
              Ready to optimize your facility? Complete the technical inquiry form, and our engineering team will provide a preliminary site assessment roadmap within 48 hours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-8 bg-white/5 rounded-none border border-white/10">
                <span className="material-symbols-outlined text-secondary text-2xl">support_agent</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                    Technical Sales
                  </p>
                  <p className="text-sm font-semibold tracking-tight">solutions@kineticprecision.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-8 bg-white/5 rounded-none border border-white/10">
                <span className="material-symbols-outlined text-secondary text-2xl">location_on</span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-2">
                    Global HQ
                  </p>
                  <p className="text-sm font-semibold tracking-tight leading-snug">
                    1200 Innovation Way,
                    <br />
                    Tech Park North
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-12 rounded-none shadow-2xl">
            <SolutionsInquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}

function SolutionDetailBody({ page }) {
  const slug = getSlug(page);
  const visuals = SOLUTION_DETAIL_VISUALS[slug] || SOLUTION_DETAIL_VISUALS.default;
  const features = page.data.features || [];
  const scenarios = page.data.scenarios || [];
  const integrations = page.data.integrations || [];

  return (
    <main>
      <section className="relative min-h-[800px] flex items-center px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-on-primary rounded-md text-[10px] font-bold tracking-widest uppercase mb-8">
              Next-Gen Automation
            </div>
            <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-primary leading-[1.05] mb-8">
              {page.data.title}
              {slug === "asrs" ? (
                <>
                  {" "}
                  - Automated Storage &amp; <span className="text-secondary">Retrieval Systems</span>
                </>
              ) : null}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-12 leading-relaxed">
              {page.data.heroSummary || page.data.summary}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                className="bg-secondary text-white px-8 py-4 rounded-md font-bold text-sm flex items-center gap-3 hover:bg-secondary/90 transition-all"
                href="/contact"
              >
                Request System Audit
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <button className="border border-outline-variant text-primary px-8 py-4 rounded-md font-bold text-sm hover:bg-surface-container transition-all">
                View Technical Specs
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img className="w-full aspect-square object-cover" src={visuals.heroImage} />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-lg border border-white/20">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">
                      Live Telemetry
                    </div>
                    <div className="text-primary font-bold">Node 04: Active</div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-right">
                      <div className="text-[10px] text-outline font-bold">Throughput</div>
                      <div className="text-primary font-bold">1,240 p/h</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-outline font-bold">Efficiency</div>
                      <div className="text-secondary font-bold">98.4%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div>
          <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
            <div>
              <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-8">
                {page.data.kicker}
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                {page.data.summary}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 pt-4">
              {(page.data.metrics || []).slice(0, 2).map((metric) => (
                <div className="border-l-2 border-outline-variant pl-8" key={metric.label}>
                  <h4 className="text-2xl font-bold text-primary mb-3">{metric.value}</h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.slice(0, 3).map((feature) => (
              <div
                className="bg-surface-container-low p-10 rounded-xl border border-outline-variant/20 hover:border-secondary/50 transition-all group"
                key={feature.title}
              >
                <span
                  className="material-symbols-outlined text-3xl text-secondary mb-8 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {feature.label === "Integration"
                    ? "hub"
                    : feature.label === "Scenario"
                      ? "view_in_ar"
                      : "layers"}
                </span>
                <div className="text-5xl font-black text-primary mb-4">
                  {feature.label === "Scenario" ? "Use" : feature.label === "Integration" ? "Sync" : "60%"}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary mb-4">
              Industrial Versatility
            </div>
            <h2 className="text-4xl font-extrabold text-primary tracking-tight">Application Scenarios</h2>
          </div>
          <div className="hidden md:flex gap-3">
            <button className="w-10 h-10 rounded-md border border-outline-variant flex items-center justify-center text-primary hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-md border border-outline-variant flex items-center justify-center text-primary hover:bg-surface-container transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {scenarios.map((scenario, index) => (
            <div className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-surface-container" key={scenario}>
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src={visuals.scenarioImages[index % visuals.scenarioImages.length]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">{scenario}</h3>
                <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {features[index]?.description || page.data.summary}
                </p>
                <Link
                  className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-widest"
                  href="/contact"
                >
                  Explore Solution <span className="material-symbols-outlined text-sm">north_east</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(254,107,0,0.1),transparent_50%)]" />
        <div className="relative z-10 px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-fixed-dim mb-8">
                The Automation Ecosystem
              </div>
              <h2 className="text-5xl font-extrabold tracking-tight mb-12">System Synergy</h2>
              <div className="space-y-10">
                {integrations.map((integration, index) => {
                  const icons = ["terminal", "precision_manufacturing", "hub"];
                  return (
                    <div className="flex gap-8 group" key={integration}>
                      <div className="w-14 h-14 shrink-0 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-secondary/20 transition-all">
                        <span
                          className="material-symbols-outlined text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {icons[index] || "hub"}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-3">{integration}</h4>
                        <p className="text-white/60 leading-relaxed max-w-md">
                          {features[index]?.description || page.data.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                <img className="w-full h-auto" src={visuals.synergyImage} />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-2xl border border-outline-variant/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 rounded-md">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      sync
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-outline tracking-widest">
                      Real-time Latency
                    </div>
                    <div className="text-2xl font-black text-primary">&lt; 15ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-primary tracking-tight mb-8">
            Ready to Architect Your Storage Future?
          </h2>
          <p className="text-on-surface-variant text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Collaborate with our engineering team to design a bespoke solution tailored to your facility profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              className="bg-secondary text-white px-10 py-5 rounded-md font-bold text-lg hover:bg-secondary/90 transition-all"
              href="/contact"
            >
              Request a System Audit
            </Link>
            <button className="bg-primary text-white px-10 py-5 rounded-md font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary-container transition-all">
              <span className="material-symbols-outlined">download</span>
              Download Technical Specs
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-0 group border border-outline-variant/30"
      data-form-label="Case Studies Newsletter Signup"
      data-form-type="newsletter"
      data-hsa-form=""
      data-success-message="Thanks, your newsletter signup has been emailed to our team."
    >
      <input
        className="flex-1 bg-white border-none focus:ring-0 px-6 py-4 text-sm font-medium"
        name="email"
        placeholder="Professional email address"
        required
        type="email"
      />
      <button className="bg-primary text-on-primary px-10 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-secondary transition-all" type="submit">
        Subscribe
      </button>
    </form>
  );
}

function CaseOverviewBody({ page }) {
  const cards = page.data.cards || [];
  const [featured, portrait, cardOne, bottomWide] = cards;

  return (
    <main>
      <section className="relative h-[440px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg5Zv1BCTFg_Oh_otNnfVHR-Ieli1m9_riedXcCosWoMX4hq4oLkD7S7R8q3oMGaw4fz4oI64b7w_xqJc-1waJ615Hzm8_-d9zxJwH-cfVbCVMVC7t7ZWjERnn_7mS7bAO3tDrg7gmigipLpKXiFZQpnn_XSq4iyODa3Z9kbr-etZtmW4ZRV8CKiHLb20ms9q-WTwOb4WgJ82lwSmbnB7jyvjjJaTiQZPY8s60URBc_8PX2jRTVL8ZKGpLIk1GaJuS10jEBy4ugzOr"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
          <span className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold mb-6 block">
            {page.data.kicker}
          </span>
          <h1 className="font-headline text-6xl md:text-8xl font-extrabold text-on-primary tracking-tighter max-w-4xl leading-[0.85]">
            Logistics <br />
            <span className="text-secondary">Engineered</span> for Scale.
          </h1>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {featured ? (
            <Link className="md:col-span-8 kinetic-card group bg-white border border-outline-variant/30 overflow-hidden flex flex-col md:flex-row" href="/case-studies/asrs">
              <div className="md:w-1/2 relative aspect-square md:aspect-auto overflow-hidden kinetic-image-mask">
                <img className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105" src={CASE_OVERVIEW_IMAGES.featured} />
              </div>
              <div className="md:w-1/2 p-12 flex flex-col">
                <div className="flex gap-2 mb-8">
                  <span className="tag-kinetic">Pharmaceutical</span>
                  <span className="tag-kinetic text-secondary">ASRS</span>
                </div>
                <h3 className="font-headline text-3xl font-bold mb-6 leading-tight tracking-tight text-primary">
                  {featured.title}
                </h3>
                <p className="text-on-surface-variant text-sm mb-8 leading-relaxed font-medium">
                  {featured.summary}
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary text-base mt-1">troubleshoot</span>
                    <p className="text-[11px] leading-tight">
                      <span className="font-black text-primary uppercase tracking-tighter">Challenge:</span> Manual sorting error rate in temperature-sensitive delivery.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary text-base mt-1">settings_input_component</span>
                    <p className="text-[11px] leading-tight">
                      <span className="font-black text-primary uppercase tracking-tighter">Solution:</span> Precision shuttles with AI predictive slotting.
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-8 border-t border-outline-variant/30 flex justify-between items-end">
                  <div className="flex gap-8">
                    <div>
                      <div className="text-2xl font-black text-primary">99.98%</div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold">
                        Accuracy
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-primary">4.2x</div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold">
                        Velocity
                      </div>
                    </div>
                  </div>
                  <span className="bg-primary text-on-primary px-5 py-3 text-[10px] font-bold uppercase tracking-widest">
                    Case Detail
                  </span>
                </div>
              </div>
            </Link>
          ) : null}
          {portrait ? (
            <Link className="md:col-span-4 kinetic-card group bg-white border border-outline-variant/30 overflow-hidden flex flex-col" href="/case-studies/material-handling">
              <div className="h-56 overflow-hidden kinetic-image-mask">
                <img className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105" src={CASE_OVERVIEW_IMAGES.portrait} />
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="mb-6 flex gap-2">
                  <span className="tag-kinetic">E-Commerce</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 tracking-tight text-primary">
                  {portrait.title}
                </h3>
                <p className="text-xs text-on-surface-variant mb-8 leading-relaxed font-medium">
                  {portrait.summary}
                </p>
                <div className="mt-auto pt-8 border-t border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-secondary">30 Min</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold">
                      Click-to-Ship
                    </div>
                  </div>
                  <span className="bg-primary text-on-primary px-4 py-3 text-[10px] font-bold uppercase tracking-widest">
                    View Case
                  </span>
                </div>
              </div>
            </Link>
          ) : null}
          {[cardOne, bottomWide].filter(Boolean).map((card, index) => (
            <Link
              className="md:col-span-4 kinetic-card group bg-white border border-outline-variant/30 overflow-hidden flex flex-col"
              href={index === 0 ? "/case-studies/picking" : "/case-studies/projects/automated-warehouse-upgrade"}
              key={card.title}
            >
              <div className="h-56 overflow-hidden kinetic-image-mask">
                <img
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                  src={index === 0 ? CASE_OVERVIEW_IMAGES.cardOne : CASE_OVERVIEW_IMAGES.cardTwo}
                />
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="mb-6 flex gap-2">
                  <span className="tag-kinetic">{index === 0 ? "Automotive" : "Cold Storage"}</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4 tracking-tight text-primary">
                  {card.title}
                </h3>
                <p className="text-xs text-on-surface-variant mb-8 leading-relaxed font-medium">
                  {card.summary}
                </p>
                <div className="mt-auto pt-8 border-t border-outline-variant/30 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-secondary">{index === 0 ? "0.0" : "-40%"}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold">
                      {index === 0 ? "Incident Rate" : "Energy Costs"}
                    </div>
                  </div>
                  <span className="bg-primary text-on-primary px-4 py-3 text-[10px] font-bold uppercase tracking-widest">
                    View Case
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className="md:col-span-4 bg-primary text-on-primary p-12 flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <span
                className="material-symbols-outlined text-secondary text-5xl mb-8 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <p className="text-2xl font-medium italic mb-10 leading-relaxed tracking-tight">
                "The transition to Huizong Intelligent Automation was the single most impactful infrastructure upgrade in our 40-year history."
              </p>
              <div>
                <div className="text-sm font-black uppercase tracking-[0.2em] text-on-primary">
                  Marcus Thorne
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-secondary/80 font-bold mt-1">
                  Director of Operations, OmniLogistics
                </div>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "20px 20px"
              }}
            />
          </div>
          {bottomWide ? (
            <Link className="md:col-span-8 kinetic-card group bg-white border border-outline-variant/30 overflow-hidden flex flex-col md:flex-row-reverse" href="/case-studies/projects/automated-warehouse-upgrade">
              <div className="md:w-1/2 relative overflow-hidden kinetic-image-mask">
                <img className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105" src={CASE_OVERVIEW_IMAGES.bottomWide} />
              </div>
              <div className="md:w-1/2 p-12 flex flex-col">
                <div className="flex gap-2 mb-8">
                  <span className="tag-kinetic">Logistics</span>
                  <span className="tag-kinetic text-secondary">Sortation</span>
                </div>
                <h3 className="font-headline text-3xl font-bold mb-6 tracking-tight text-primary">
                  {bottomWide.title}
                </h3>
                <p className="text-sm text-on-surface-variant mb-10 leading-relaxed font-medium">
                  {bottomWide.summary}
                </p>
                <div className="mt-auto pt-8 border-t border-outline-variant/30 flex justify-between items-end">
                  <div className="flex gap-10">
                    <div>
                      <div className="text-2xl font-black text-primary">40k</div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold">
                        Units / Hour
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black text-primary">14 Mo</div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-outline font-bold">
                        ROI Period
                      </div>
                    </div>
                  </div>
                  <span className="bg-primary text-on-primary px-5 py-3 text-[10px] font-bold uppercase tracking-widest">
                    Case Detail
                  </span>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 mb-32">
        <div className="bg-surface-container-low p-16 md:p-24 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden border border-outline-variant/20">
          <div className="flex-1 relative z-10">
            <h2 className="font-headline text-5xl font-extrabold mb-6 tracking-tighter text-primary">
              Ready to Engineer <br />
              Your Future?
            </h2>
            <p className="text-on-surface-variant max-w-lg text-base leading-relaxed font-medium">
              Get our quarterly "State of Automation" report featuring deep dives into ROI metrics and emerging warehouse tech.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md relative z-10">
            <NewsletterForm />
            <p className="text-[10px] text-outline mt-4 uppercase tracking-[0.3em] font-bold">
              Industry insights delivered every 90 days.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,0 L100,0 L100,100 Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseCategoryBody({ page }) {
  const slug = getSlug(page);
  const visuals = CASE_CATEGORY_VISUALS[slug] || CASE_CATEGORY_VISUALS.default;
  const projects = page.data.projects || [];

  return (
    <main>
      <section className="relative bg-primary overflow-hidden min-h-[500px] flex items-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('${visuals.hero}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
        <div className="relative max-w-screen-2xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <span className="inline-block px-4 py-1 mb-6 rounded-full bg-secondary text-on-secondary text-xs font-bold tracking-widest uppercase font-label">
              Solutions Portfolio
            </span>
            <h1 className="text-display-lg text-5xl md:text-7xl font-extrabold text-white font-headline tracking-tighter mb-8 leading-[1.1]">
              {page.data.title}
            </h1>
            <p className="text-xl md:text-2xl text-on-primary-container font-light max-w-2xl leading-relaxed">
              {page.data.summary}
            </p>
          </div>
          <div className="hidden lg:block lg:col-span-4">
            <div className="p-8 border-l-4 border-secondary bg-primary-container/30 backdrop-blur-md">
              <div className="text-4xl font-black text-white mb-2">
                {getMetricValue(page.data.metrics, 2, "99.9%")}
              </div>
              <div className="text-on-primary-container uppercase tracking-widest text-xs font-bold">
                Standard Efficiency Across Installations
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {projects[0] ? (
            <Link className="md:col-span-8 group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl" href="/case-studies/projects/automated-warehouse-upgrade">
              <div className="h-96 w-full overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" src={visuals.images[0]} />
                <div className="absolute top-6 left-6">
                  <span className="bg-secondary text-white px-3 py-1 text-xs font-bold rounded-sm tracking-widest uppercase">
                    {slug.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-10 flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-3xl font-black text-primary font-headline tracking-tight mb-4 group-hover:text-secondary transition-colors">
                    {projects[0].title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg mb-6">
                    {projects[0].description}
                  </p>
                  <span className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    View Technical Specs
                    <span className="material-symbols-outlined text-secondary">trending_flat</span>
                  </span>
                </div>
                <div className="bg-surface-container-low p-6 rounded-lg flex flex-col justify-center border-t-4 border-secondary">
                  <div className="text-secondary text-5xl font-black mb-2">
                    {getMetricValue(page.data.metrics, 2, "40%")}
                  </div>
                  <div className="text-xs uppercase font-bold tracking-widest text-primary leading-tight">
                    {getMetricLabel(page.data.metrics, 2, "Best Throughput Gain")}
                  </div>
                </div>
              </div>
            </Link>
          ) : null}
          {projects[1] ? (
            <article className="md:col-span-4 group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <div className="h-72 w-full overflow-hidden relative">
                <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" src={visuals.images[1]} />
                <div className="absolute top-6 left-6">
                  <span className="bg-secondary text-white px-3 py-1 text-xs font-bold rounded-sm tracking-widest uppercase">
                    {slug.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-primary font-headline tracking-tight mb-4 group-hover:text-secondary transition-colors">
                  {projects[1].title}
                </h3>
                <p className="text-on-surface-variant text-sm mb-auto leading-relaxed">
                  {projects[1].description}
                </p>
                <div className="mt-8 pt-6 border-t border-outline-variant flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-black text-secondary">
                      {getMetricValue(page.data.metrics, 0, "100%")}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-primary tracking-widest">
                      {getMetricLabel(page.data.metrics, 0, "Inventory Accuracy")}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-secondary">
                    add_circle
                  </span>
                </div>
              </div>
            </article>
          ) : null}
          <article className="md:col-span-12 group relative flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl border-l-8 border-primary">
            <div className="p-10 md:w-1/2 flex flex-col justify-center">
              <div className="mb-4">
                <span className="bg-secondary text-white px-3 py-1 text-xs font-bold rounded-sm tracking-widest uppercase">
                  {slug.toUpperCase()}
                </span>
              </div>
              <h3 className="text-3xl font-black text-primary font-headline tracking-tight mb-4 group-hover:text-secondary transition-colors">
                {projects[2]?.title || "Automated Warehouse Upgrade with ASRS System"}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-lg mb-8 max-w-xl">
                {projects[2]?.description || "Brownfield site modernization project integrating advanced robotic retrieval into legacy structures without disruption."}
              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-3xl font-black text-primary">ZERO</div>
                  <div className="text-[10px] uppercase font-bold text-secondary tracking-widest">
                    Downtime Integration
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">24/7</div>
                  <div className="text-[10px] uppercase font-bold text-secondary tracking-widest">
                    Operation Uptime
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 h-80 md:h-auto overflow-hidden relative">
              <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" src={visuals.images[2]} />
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors" />
            </div>
          </article>
        </div>
      </section>

      <section className="bg-surface-container-highest py-24">
        <div className="max-w-screen-xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-primary font-headline tracking-tighter mb-6">
            Ready for Next-Gen Density?
          </h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10">
            Our engineering team is ready to blueprint your facility's evolution. Let's design for zero tolerance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link className="bg-primary text-white px-10 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-black transition-all" href="/contact">
              Request Technical Quote
            </Link>
            <button className="border-2 border-primary text-primary px-10 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseProjectDetailBody({ page }) {
  const bottlenecks = page.data.bottlenecks || [];
  const solutionStack = page.data.solutionStack || [];
  const commissioning = page.data.commissioning || [];

  return (
    <main>
      <section className="relative h-[800px] w-full flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Warehouse Hero" className="w-full h-full object-cover opacity-40 mix-blend-overlay" src={CASE_PROJECT_VISUALS.hero} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        </div>
        <div className="relative z-10 px-12 lg:px-24 w-full max-w-5xl">
          <div className="flex items-center space-x-4 mb-8">
            <span className="h-[2px] w-12 bg-secondary" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary">Industrial Transformation</span>
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-white font-headline leading-[1] tracking-tighter mb-12">
            Automated <br />
            Warehouse <br />
            Upgrade
          </h1>
          <div className="flex space-x-16 pt-8 border-t border-white/10">
            <div>
              <p className="text-on-primary-container text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Location</p>
              <p className="text-white font-bold text-lg font-headline">Singapore Tech Hub</p>
            </div>
            <div>
              <p className="text-on-primary-container text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Timeline</p>
              <p className="text-white font-bold text-lg font-headline">14 Months</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-12 bg-surface" id="overview">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-4">
            <p className="text-secondary font-black text-xs tracking-[0.3em] uppercase mb-6">
              01. Overview
            </p>
            <h2 className="text-5xl font-black font-headline text-primary leading-tight kinetic-border pb-8">
              {page.data.kicker}
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-surface-container-low p-16 border-l-4 border-primary">
              <p className="text-2xl leading-relaxed text-on-surface-variant font-medium">
                {page.data.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-12 bg-slate-900 text-white" id="challenge">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-20">
            <p className="text-secondary font-black text-xs tracking-[0.3em] uppercase mb-6">
              02. The Challenge
            </p>
            <h2 className="text-5xl font-black font-headline tracking-tighter">Critical Bottlenecks</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {bottlenecks.map((bottleneck, index) => {
              const icons = ["dynamic_feed", "view_in_ar", "emergency_home"];
              return (
                <div
                  className={`p-16 hover:bg-primary transition-colors group ${
                    index < bottlenecks.length - 1 ? "border-b md:border-b-0 md:border-r border-white/10" : ""
                  }`}
                  key={bottleneck.title}
                >
                  <span className="material-symbols-outlined text-4xl text-secondary mb-8 group-hover:scale-110 transition-transform inline-block">
                    {icons[index] || "dynamic_feed"}
                  </span>
                  <h4 className="text-2xl font-bold mb-6 font-headline">{bottleneck.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{bottleneck.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-12 bg-surface" id="solution">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-secondary font-black text-xs tracking-[0.3em] uppercase mb-6">
                03. The Solution
              </p>
              <h2 className="text-5xl font-black font-headline text-primary mb-12 tracking-tighter">
                Integrated Ecosystem
              </h2>
              <div className="space-y-12">
                {solutionStack.map((item) => (
                  <div className="group cursor-default" key={item}>
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                      <span className="w-2 h-2 bg-secondary mr-4" />
                      {item}
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed pl-6 border-l border-slate-200 group-hover:border-secondary transition-colors">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 border-2 border-slate-100 -z-10 translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
                <img
                  alt="Solution Integration"
                  className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src={CASE_PROJECT_VISUALS.solution}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-12 bg-primary text-white" id="delivery">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-24 flex flex-col items-center text-center">
            <p className="text-secondary font-black text-xs tracking-[0.3em] uppercase mb-6">
              04. Delivery Process
            </p>
            <h2 className="text-5xl font-black font-headline tracking-tighter max-w-3xl">
              Zero-Tolerance Commissioning
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {commissioning.map((item, index) => (
              <div className="relative pl-12" key={item}>
                <div className="absolute left-0 top-0 text-7xl font-black text-white/5 font-headline leading-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4 uppercase tracking-widest text-secondary">{item}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item} executed as part of the program's structured commissioning and go-live plan.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-40 px-12 bg-white" id="results">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-secondary font-black text-xs tracking-[0.3em] uppercase mb-6">
            05. Performance Results
          </p>
          <h2 className="text-6xl font-black font-headline text-primary mb-24 tracking-tighter">
            Impact Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            {(page.data.metrics || []).map((metric) => (
              <div className="flex flex-col items-center" key={metric.label}>
                <div className="relative mb-8">
                  <span className="text-8xl font-black text-primary font-headline tracking-tighter">
                    {metric.value}
                  </span>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary/20" />
                </div>
                <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
                  {metric.label}
                </p>
                <p className="text-slate-400 mt-4 text-sm max-w-[200px]">
                  Verified against operational targets during rollout.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className="text-3xl font-black font-headline text-primary tracking-tight">
                Leveraged Technologies
              </h3>
              <p className="text-slate-500 mt-2">Explore the systems used in this transformation</p>
            </div>
            <Link className="text-xs font-bold text-secondary uppercase tracking-widest border-b-2 border-secondary pb-1 hover:text-primary hover:border-primary transition-all" href="/solutions">
              View All Solutions
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {CASE_PROJECT_VISUALS.related.map((item) => (
              <Link className="group bg-white overflow-hidden border border-slate-200" href={item.href} key={item.title}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors" />
                </div>
                <div className="p-10">
                  <h4 className="text-2xl font-bold font-headline text-primary mb-4">{item.title}</h4>
                  <p className="text-slate-600 mb-8 leading-relaxed">{item.description}</p>
                  <span className="text-secondary font-black text-xs uppercase tracking-widest flex items-center space-x-2 group/btn">
                    <span>Learn More</span>
                    <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-12 bg-white">
        <div className="max-w-[1440px] mx-auto bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 -skew-x-12 translate-x-24" />
          <div className="relative z-10 p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-2/3">
              <h2 className="text-5xl font-black font-headline text-white mb-8 tracking-tighter leading-tight">
                Ready to engineer your future?
              </h2>
              <p className="text-slate-400 text-xl mb-12 max-w-2xl">
                Discuss your facility's bottlenecks with our zero-tolerance automation experts and receive a comprehensive site audit report.
              </p>
              <Link className="bg-secondary hover:bg-secondary-container text-on-secondary px-12 py-5 rounded-sm text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-black/20" href="/contact">
                Consult an Expert
              </Link>
            </div>
            <div className="lg:w-1/3 w-full">
              <div className="space-y-10 border-l border-white/10 pl-12">
                <div className="flex items-start space-x-6">
                  <span className="material-symbols-outlined text-secondary text-3xl">verified</span>
                  <div>
                    <p className="text-white font-bold font-headline text-lg">Certified Integration</p>
                    <p className="text-slate-400 text-sm mt-1">ISO 9001:2015 Compliant</p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <span className="material-symbols-outlined text-secondary text-3xl">public</span>
                  <div>
                    <p className="text-white font-bold font-headline text-lg">Global Presence</p>
                    <p className="text-slate-400 text-sm mt-1">On-site Support in 42 Countries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function StructuredCatalogOverviewPage({ page }) {
  return (
    <PublicPageChrome page={page}>
      <div className="page-content">
        {page.kind === "product-overview" ? (
          <ProductOverviewBody page={page} />
        ) : page.kind === "solution-overview" ? (
          <SolutionOverviewBody page={page} />
        ) : (
          <CaseOverviewBody page={page} />
        )}
      </div>
    </PublicPageChrome>
  );
}

export function StructuredCatalogDetailPage({ page }) {
  return (
    <PublicPageChrome page={page}>
      <div className="page-content">
        {page.kind === "product-detail" ? (
          <ProductDetailBody page={page} />
        ) : page.kind === "solution-detail" ? (
          <SolutionDetailBody page={page} />
        ) : page.kind === "case-category" ? (
          <CaseCategoryBody page={page} />
        ) : (
          <CaseProjectDetailBody page={page} />
        )}
      </div>
    </PublicPageChrome>
  );
}
